import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';

import * as ROUTES from './constants/routes';
import {withAuthentication} from './components/Session/Session';

import AccountPage from './components/Account/Account';
import AdminPage from './components/Admin/Admin';
import BookItem from './components/BookItem/BookItem';
import Navbar from './components/Navbar/Navbar';
import GoogleMap from './components/GoogleMap/GoogleMap';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForgetPage from './components/PasswordForget/PasswordForget';
import Firebase, {FirebaseContext} from './components/Firebase';

import './styling/style.scss';

const TestComponent = props => {
  return (
    <React.Fragment>
      <div>
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
      <div className="google-map-wrapper">
        <GoogleMap />
      </div>
      <BookItem />
    </React.Fragment>
  );
};

const AppBase = () => (
  <React.Fragment>
    <Navbar />
    <div className="page-container">
      <Switch>
        <Route exact path={ROUTES.LANDING} render={() => <TestComponent />} />
        <Route path={ROUTES.SIGN_UP} render={() => <SignUp />} />
        <Route path={ROUTES.LOG_IN} render={() => <SignIn />} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          render={() => <PasswordForgetPage />}
        />
        <Route path={ROUTES.ACCOUNT} render={() => <AccountPage />} />
        <Route path={ROUTES.ADMIN} render={() => <AdminPage />} />
        <Route
          path={ROUTES.BOOKS}
          render={() => <h2>This is the books page.</h2>}
        />
        <Route
          path={ROUTES.BOOK_DETAIL}
          render={() => <h2>This is the book detail page.</h2>}
        />
        <Route
          path={ROUTES.ADD_BOOK}
          render={() => <h2>This is the add book page.</h2>}
        />
        <Route
          path={ROUTES.MY_BOOK_HISTORY}
          render={() => <h2>This is the my book history page.</h2>}
        />
      </Switch>
    </div>
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
