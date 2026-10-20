// Firebase facade: same method surface as the 2019 version, implemented on
// the modular Firebase Web SDK (v11) so call sites keep working while the
// internals use current, tree-shakeable APIs.
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  onAuthStateChanged,
  EmailAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  onSnapshot,
  FieldValue
} from 'firebase/firestore';
import {getStorage, ref as storageRef, getDownloadURL} from 'firebase/storage';
import {algoliaIndex} from '../algolia';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const confirmationEmailRedirect = import.meta.env
  .VITE_CONFIRMATION_EMAIL_REDIRECT;

class Firebase {
  constructor() {
    this.app = initializeApp(config);
    this.fieldValue = FieldValue;
    this.emailAuthProvider = EmailAuthProvider;
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.myUID = null;
    this.facebookProvider = new FacebookAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignInWithFacebook = () => signInWithPopup(this.auth, this.facebookProvider);

  doSignOut = () => signOut(this.auth);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = (passwordOne, passwordTwo) => {
    if (!passwordOne || passwordOne.length <= 5 || passwordTwo.length <= 5) {
      return Promise.reject({
        code: 'passwords-too-short',
        message: 'The password should at least be 6 characters long.'
      });
    }
    if (passwordOne !== passwordTwo) {
      return Promise.reject({
        code: 'passwords-not-the-same',
        message: 'Passwords not the same.'
      });
    }
    return updatePassword(this.auth.currentUser, passwordOne);
  };

  doSendEmailVerification = () =>
    sendEmailVerification(this.auth.currentUser, {
      url: confirmationEmailRedirect
    });

  // *** Storage API ***
  getImage = (ref, imgId) =>
    getDownloadURL(storageRef(this.storage, ref))
      .then(url => {
        const img = document.getElementById(imgId);
        if (img) img.src = url;
      })
      .catch(err => {
        console.error(err);
      });

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    onAuthStateChanged(this.auth, authUser => {
      if (authUser) {
        this.myUID = authUser.uid;
        getDoc(this.user(authUser.uid)).then(snapshot => {
            const dbUser = snapshot.data();
            next({
              age: authUser.age,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              location: authUser.location,
              myBooks: authUser.myBooks,
              phoneNumber: authUser.phoneNumber,
              photoUrl: authUser.photoUrl,
              providerData: authUser.providerData,
              userName: authUser.userName,
              transactions: authUser.transactions,
              uid: authUser.uid,
              ...dbUser
            });
          });
      } else {
        fallback();
      }
    });

  getMyUID = () => this.myUID;

  // *** Firestore API (v5-style refs so call sites stay unchanged) ***
  user = uid => doc(this.db, 'users', uid);
  users = () => collection(this.db, 'users');
  book = uid => doc(this.db, 'books', uid);
  books = () => collection(this.db, 'books');
  transaction = id => doc(this.db, 'transactions', id);
  transactions = () => collection(this.db, 'transactions');

  // *** Algolia sync listener ***
  // NOTE: kept for parity; writing to Algolia from the browser needs an
  // admin-capable key and should move server-side (see MODERNIZATION.md).
  onBooksAddedListener = () => {
    onSnapshot(collection(this.db, 'books'), snap => {
      snap.docChanges().forEach(change => {
        this.addOrUpdateIndexRecord(change.doc);
      });
    });
  };

  addOrUpdateIndexRecord(dataSnapshot) {
    const firebaseObject = dataSnapshot.data();
    firebaseObject.objectID = dataSnapshot.id;
    algoliaIndex.saveObject(firebaseObject).catch(err => {
      console.error(err);
    });
  }
}

export default Firebase;
