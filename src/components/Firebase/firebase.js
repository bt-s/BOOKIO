import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {index} from '../Algolia';

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  confirmationEmailRedirect:
    process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT
};

const prodConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  confirmationEmailRedirect:
    process.env.REACT_APP_PROD_CONFIRMATION_EMAIL_REDIRECT
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper functions */
    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage;
    this.myUID = null;

    /* Facebook sign in method provider */
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Storage API ***
  getImage = (ref, imgId) =>
    this.storage()
      .refFromURL(ref)
      .getDownloadURL()
      .then(url => {
        const img = document.getElementByID(imgId);
        img.src = url;
      })
      .catch(err => {
        console.error(err);
      });

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (passwordOne, passwordTwo) => {
    return new Promise((resolve, reject) => {
      if (passwordOne <= 5 || passwordTwo <= 5) {
        reject({
          code: 'passwords-too-short',
          message: 'The password should at least be 6 characters long.'
        });
      } else if (passwordOne === passwordTwo) {
        resolve(this.auth.currentUser.updatePassword(passwordOne));
      } else {
        reject({
          code: 'passwords-not-the-same',
          message: 'Passwords not the same.'
        });
      }
    });
  };

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: config.confirmationEmailRedirect
    });

  // *** Algolia API ***
  onBooksAddedListener = change => {
    this.db.collection('books').onSnapshot(snap => {
      snap.docChanges().forEach(change => {
        // if (change.type === 'added') {
        this.addOrUpdateIndexRecord(change.doc);
        // }
      });
    });
  };
  addOrUpdateIndexRecord(dataSnapshot) {
    let firebaseObject = dataSnapshot.data();
    // Specify Algolia's objectID using the Firebase object key
    firebaseObject.objectID = dataSnapshot.id;
    // Add or update object
    index.setSettings({
      attributesForFaceting: ['type']
    });

    index.saveObject(firebaseObject, err => {
      if (err) {
        throw err;
      }
    });
  }

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.myUID = authUser.uid; //store my uid
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // merge auth and db user
            authUser = {
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
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // should be checked if null before userw
  getMyUID = () => this.myUID;

  // *** API ***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');
  book = uid => this.db.doc(`books/${uid}`);
  books = () => this.db.collection('books');
  transaction = id => this.db.doc(`transactions/${id}`);
  transactions = () => this.db.collection('transactions');
}

export default Firebase;
