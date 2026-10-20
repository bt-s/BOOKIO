import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';

import * as ROUTES from './constants/routes';

import {withAuthentication} from './components/Session/Session';
import Firebase, {FirebaseContext} from './firebase';
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
import './constants/fa';

const WithFooter = ({children}) => (
  <>
    {children}
    <Footer />
  </>
);

const WithNavbar = ({children}) => (
  <>
    <Navbar />
    <div className="page-container">{children}</div>
  </>
);

const WithoutNavbar = ({children}) => (
  <div className="page-container">{children}</div>
);

const App = () => (
  <Routes>
    <Route
      path={ROUTES.LANDING}
      element={
        <WithFooter>
          <WithNavbar>
            <HomePage />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.PASSWORD_FORGET}
      element={
        <WithoutNavbar>
          <PasswordForgetPage />
        </WithoutNavbar>
      }
    />
    <Route
      path={ROUTES.ACCOUNT}
      element={
        <WithFooter>
          <WithNavbar>
            <AccountPage />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.BOOKS}
      element={
        <WithFooter>
          <WithNavbar>
            <BooksPage />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.BOOK_DETAIL}
      element={
        <WithFooter>
          <WithNavbar>
            <BookDetail />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.ADD_BOOK}
      element={
        <WithFooter>
          <WithNavbar>
            <AddNewBookPage />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.MY_BOOK_HISTORY}
      element={
        <WithFooter>
          <WithNavbar>
            <HistoryPage />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.SIGN_UP}
      element={
        <WithoutNavbar>
          <SignUpPage />
        </WithoutNavbar>
      }
    />
    <Route
      path={ROUTES.LOG_IN}
      element={
        <WithoutNavbar>
          <SignInPage />
        </WithoutNavbar>
      }
    />
    <Route
      path={ROUTES.EDIT_PROFILE}
      element={
        <WithFooter>
          <WithNavbar>
            <EditProfilePage />
          </WithNavbar>
        </WithFooter>
      }
    />
    <Route
      path={ROUTES.SETTINGS}
      element={
        <WithFooter>
          <WithNavbar>
            <SettingsPage />
          </WithNavbar>
        </WithFooter>
      }
    />
  </Routes>
);

const AppWithAuthentication = withAuthentication(App);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <AppWithAuthentication />
      </FirebaseContext.Provider>
    </Provider>
  </BrowserRouter>
);
