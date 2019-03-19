import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// import {firebaseAPIKey} from '../APIKeys/APIKeys';

const REACT_APP_CONFIRMATION_EMAIL_REDIRECT = 'http://localhost:3000';

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'bookio-5c798.firebaseapp.com',
  databaseURL: 'https://bookio-5c798.firebaseio.com',
  projectId: 'bookio',
  storageBucket: 'bookio.appspot.com',
  messagingSenderId: '74803950777'
};

const config = process.env.NODE_ENV === 'development' ? devConfig : null;

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

    /* Facebook sign in method provider */
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

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
      url: REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** API ***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');
}

export default Firebase;
