import app from 'firebase/app';
import 'firebase/auth';

import {firebaseAPIKey} from '../APIKeys/APIKeys';

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
}

export default Firebase;
