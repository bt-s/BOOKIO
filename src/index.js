import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';

import * as ROUTES from './constants/routes';

import {withAuthentication} from './components/Session/Session';
import Firebase, {FirebaseContext} from './components/Firebase';
import Navbar from './components/Navbar/Navbar';
import GoogleMap from './components/GoogleMap/GoogleMap';
import {BookItem, BookItemV2} from './components/BookItem/BookItem';
import AddNewBookPage from './pages/AddNewBookPage';

import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import BookDetail from './pages/BookDetail';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PasswordForgetPage from './pages/PasswordForgetPage';
import BooksPage from './pages/BooksPage';
import HistoryPage from './pages/HistoryPage';

import './styling/style.scss';

require('dotenv').config();

const TestComponent = props => {
  return (
    <React.Fragment>
      <div>
        <b>
          This page is for test purpose, click links below to check different
          pages Click the logo above to go back to this test page.
        </b>
        <br />
        <br />
        <Link to={ROUTES.ACCOUNT}>Account page</Link>
        <br />
        <Link to={ROUTES.ADD_BOOK}>Add book page</Link>
        <br />
        <Link to={ROUTES.ADMIN}>Admin page</Link>
        <br />
        <Link to={ROUTES.BOOKS}>Books page</Link>
        <br />
        <Link to={ROUTES.BOOK_DETAIL}>Book detail page</Link>
        <br />
        <Link to={ROUTES.LOG_IN}>Login page</Link>
        <br />
        <Link to={ROUTES.PASSWORD_FORGET}>Password forget page</Link>
        <br />
        <Link to={ROUTES.SIGN_UP}>Signup page</Link>
        <br />
        <Link to={ROUTES.MY_BOOK_HISTORY}>My book history page</Link>
      </div>
      <BookItem />
      <BookItemV2 />
    </React.Fragment>
  );
};

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
  <React.Fragment>
    <Switch>
      <Route
        exact
        path={ROUTES.LANDING}
        render={() => (
          <WithNavbar>
            <TestComponent />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        render={() => (
          <WithNavbar>
            <PasswordForgetPage />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.ACCOUNT}
        render={() => (
          <WithNavbar>
            <AccountPage />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.ADMIN}
        render={() => (
          <WithNavbar>
            <AdminPage />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.BOOKS}
        render={() => (
          <WithNavbar>
            <BooksPage />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.BOOK_DETAIL}
        render={() => (
          <WithNavbar>
            <BookDetail />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.ADD_BOOK}
        render={() => (
          <WithNavbar>
            <AddNewBookPage />
          </WithNavbar>
        )}
      />
      <Route
        path={ROUTES.MY_BOOK_HISTORY}
        render={() => (
          <WithNavbar>
            <HistoryPage />
          </WithNavbar>
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
    </Switch>
  </React.Fragment>
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
