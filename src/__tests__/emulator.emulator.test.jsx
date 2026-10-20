// Integration tests against the local Firebase Emulator Suite.
// Run with: npm run test:emulator
// These never touch the production project: the facade's app handle is
// re-pointed at localhost emulators before any call.
import {describe, it, expect, beforeAll} from 'vitest';
import {connectAuthEmulator} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  getDocs
} from 'firebase/firestore';
import Firebase from '../firebase/firebase';

const fb = new Firebase();

beforeAll(() => {
  connectAuthEmulator(fb.auth, 'http://localhost:9099', {disableWarnings: true});
  connectFirestoreEmulator(fb.db, 'localhost', 8180);
});

describe('auth lifecycle (emulator)', () => {
  const email = 'emulator-user@example.com';
  const password = 'secret-password-1';

  it('creates a user, signs out and back in', async () => {
    const cred = await fb.doCreateUserWithEmailAndPassword(email, password);
    expect(cred.user.uid).toBeTruthy();
    expect(cred.user.email).toBe(email);

    await fb.doSignOut();
    expect(fb.auth.currentUser).toBeNull();

    const cred2 = await fb.doSignInWithEmailAndPassword(email, password);
    expect(cred2.user.uid).toBe(cred.user.uid);
  });

  it('rejects wrong passwords', async () => {
    await expect(
      fb.doSignInWithEmailAndPassword(email, 'wrong-password')
    ).rejects.toMatchObject({
      code: expect.stringMatching(
        /auth\/(invalid-credential|wrong-password|invalid-login-credentials)/
      )
    });
  });

  it('validates password update rules before calling the SDK', async () => {
    await expect(fb.doPasswordUpdate('abc', 'abc')).rejects.toMatchObject({
      code: 'passwords-too-short'
    });
    await expect(
      fb.doPasswordUpdate('long-enough-1', 'long-enough-2')
    ).rejects.toMatchObject({code: 'passwords-not-the-same'});
    await expect(
      fb.doPasswordUpdate('new-password-1', 'new-password-1')
    ).resolves.toBeUndefined();
  });

  it('sends password reset and verification emails without error', async () => {
    await expect(fb.doPasswordReset(email)).resolves.toBeUndefined();
    await expect(fb.doSendEmailVerification()).resolves.toBeUndefined();
  });
});

describe('user document CRUD (emulator)', () => {
  it('writes, reads, updates and deletes a user doc via facade refs', async () => {
    const uid = fb.auth.currentUser.uid;
    await setDoc(
      fb.user(uid),
      {username: 'emulator', email: fb.auth.currentUser.email, myBooks: [], transactions: [], items: []},
      {merge: true}
    );
    let snap = await getDoc(fb.user(uid));
    expect(snap.exists()).toBe(true);
    expect(snap.data().username).toBe('emulator');

    await updateDoc(fb.user(uid), {location: 'Stockholm'});
    snap = await getDoc(fb.user(uid));
    expect(snap.data().location).toBe('Stockholm');

    await deleteDoc(fb.user(uid));
    snap = await getDoc(fb.user(uid));
    expect(snap.exists()).toBe(false);
  });
});

describe('core book lifecycle (emulator, mirrors component call sequences)', () => {
  it('publish -> request -> accept -> delete', async () => {
    // ---- AddNewBookForm.storeData sequence ----
    const ownerUid = fb.auth.currentUser.uid;
    await setDoc(
      fb.user(ownerUid),
      {username: 'owner', myBooks: [], transactions: [], items: []},
      {merge: true}
    );

    const bookRef = await addDoc(fb.books(), {
      title: 'Emulator Book',
      ownerId: ownerUid,
      owner: 'owner',
      rating: 4.2,
      description: 'A book added by the emulator test',
      author: 'Test Author',
      location: {lat: 59.3, lon: 18.0},
      imageUrls: [],
      type: 'lend',
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    expect(bookRef.id).toBeTruthy();

    // updateImage: attach image urls
    await updateDoc(fb.book(bookRef.id), {imageUrls: ['http://example/img.jpg']});

    // append to owner's myBooks
    const ownerSnap = await getDoc(fb.user(ownerUid));
    await updateDoc(fb.user(ownerUid), {
      myBooks: [...ownerSnap.data().myBooks, bookRef.id]
    });

    let bookSnap = await getDoc(fb.book(bookRef.id));
    expect(bookSnap.exists()).toBe(true);
    expect(bookSnap.data().title).toBe('Emulator Book');
    expect(bookSnap.data().imageUrls).toEqual(['http://example/img.jpg']);

    // ---- BookDetail.requestBook sequence (second user) ----
    const consumer = await fb.doCreateUserWithEmailAndPassword(
      'consumer@example.com',
      'consumer-password'
    );
    const consumerUid = consumer.user.uid;
    await setDoc(
      fb.user(consumerUid),
      {username: 'consumer', myBooks: [], transactions: [], items: []},
      {merge: true}
    );

    const consumerSnap = await getDoc(fb.user(consumerUid));
    const transacRef = await addDoc(fb.transactions(), {
      providerID: ownerUid,
      consumerID: consumerUid,
      status: 'Ongoing',
      requestTime: Date.now(),
      itemID: bookRef.id,
      type: 'lend'
    });
    await updateDoc(fb.user(consumerUid), {
      transactions: (consumerSnap.data().transactions || []).concat(transacRef.id),
      items: (consumerSnap.data().items || []).concat(bookRef.id)
    });
    await updateDoc(fb.user(ownerUid), {
      transactions: (consumerSnap.data().transactions || []).concat(transacRef.id)
    });

    // ---- HistoryPage accept flow ----
    await updateDoc(fb.transaction(transacRef.id), {status: 'accepted'});
    const tSnap = await getDoc(fb.transaction(transacRef.id));
    expect(tSnap.data().status).toBe('accepted');

    // ---- HistoryPage data assembly: transaction refs resolve ----
    const finalConsumer = await getDoc(fb.user(consumerUid));
    expect(finalConsumer.data().transactions).toContain(transacRef.id);
    expect(finalConsumer.data().items).toContain(bookRef.id);
    const involvedBook = await getDoc(fb.book(tSnap.data().itemID));
    expect(involvedBook.data().title).toBe('Emulator Book');

    // ---- BookItem delete flow ----
    await deleteDoc(fb.book(bookRef.id));
    bookSnap = await getDoc(fb.book(bookRef.id));
    expect(bookSnap.exists()).toBe(false);
  });
});

