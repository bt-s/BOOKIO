import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {firebaseAPIKey} from '../APIKeys/APIKeys';

const REACT_APP_CONFIRMATION_EMAIL_REDIRECT = 'http://localhost:3000';

const devConfig = {
  apiKey: firebaseAPIKey,
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

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

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
