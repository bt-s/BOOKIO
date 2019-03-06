import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();

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

  // *** API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;
