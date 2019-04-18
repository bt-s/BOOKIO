import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';

import * as ROUTES from './constants/routes';

import {withAuthentication} from './components/Session/Session';
import Firebase, {FirebaseContext} from './components/Firebase';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

import AccountPage from './pages/AccountPage';
import AddNewBookPage from './pages/AddNewBookPage';
import BookDetail from './pages/BookDetail';
import BooksPage from './pages/BooksPage';
import EditProfilePage from './pages/EditProfilePage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import PasswordForgetPage from './pages/PasswordForgetPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';

import './styling/style.scss';

/* eslint-disable no-unused-vars */
import library from './constants/fa';
/* eslint-enable-no-unused-vars */

require('dotenv').config();

const WithFooter = ({children}) => (
  <React.Fragment>
    {children}
    <Footer />
  </React.Fragment>
);

const WithNavbar = ({children}) => (
  <React.Fragment>
    <Navbar />
    <div className="page-container">{children}</div>
  </React.Fragment>
);

const WithoutNavbar = ({children}) => (
  <div className="page-container">{children}</div>
);

const AppBase = () => (
  <Switch>
    <Route
      exact
      path={ROUTES.LANDING}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <HomePage />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.PASSWORD_FORGET}
      render={() => (
        <WithoutNavbar>
          <PasswordForgetPage />
        </WithoutNavbar>
      )}
    />
    <Route
      path={ROUTES.ACCOUNT}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <AccountPage />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.BOOKS}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <BooksPage />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.BOOK_DETAIL}
      render={props => (
        <WithFooter>
          <WithNavbar>
            <BookDetail {...props} />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.ADD_BOOK}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <AddNewBookPage />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.MY_BOOK_HISTORY}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <HistoryPage />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.SIGN_UP}
      render={() => (
        <WithoutNavbar>
          <SignUpPage />
        </WithoutNavbar>
      )}
    />
    <Route
      path={ROUTES.LOG_IN}
      render={() => (
        <WithoutNavbar>
          <SignInPage />
        </WithoutNavbar>
      )}
    />
    <Route
      path={ROUTES.EDIT_PROFILE}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <EditProfilePage />
          </WithNavbar>
        </WithFooter>
      )}
    />
    <Route
      path={ROUTES.SETTINGS}
      render={() => (
        <WithFooter>
          <WithNavbar>
            <SettingsPage />
          </WithNavbar>
        </WithFooter>
      )}
    />
  </Switch>
);

const App = withAuthentication(AppBase);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
