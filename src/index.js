import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';

import {
  ACCOUNT,
  ADD_BOOK,
  ADMIN,
  BOOKS,
  BOOK_DETAIL,
  LANDING,
  LOG_IN,
  PASSWORD_FORGET,
  SIGN_UP
} from './routes';

import Form from './components/Form/Form';
import List from './components/List/List';
import Post from './components/Post/Post';

import './styling/style.scss';

const TestComponent = () => (
  <React.Fragment>
    <div>
      <h2>Books</h2>
      <List />
    </div>
    <div>
      <h2>Add a new article</h2>
      <Form />
    </div>
    <div>
      <h2>API posts</h2>
      <Post />
    </div>

    <div>
      <Link to={ACCOUNT}>Account page</Link>
      <br />
      <Link to={ADD_BOOK}>Add book page</Link>
      <br />
      <Link to={ADMIN}>Admin page</Link>
      <br />
      <Link to={BOOKS}>Books page</Link>
      <br />
      <Link to={BOOK_DETAIL}>Book detail page</Link>
      <br />
      <Link to={LOG_IN}>Login page</Link>
      <br />
      <Link to={PASSWORD_FORGET}>Password forget page</Link>
      <br />
      <Link to={SIGN_UP}>Signup page</Link>
    </div>
  </React.Fragment>
);

const App = () => (
  <React.Fragment>
    <div className="page-container">
      <Switch>
        <Route exact path={LANDING} render={() => <TestComponent />} />
        <Route
          path={SIGN_UP}
          render={() => <h2>This is the signup page.</h2>}
        />
        <Route path={LOG_IN} render={() => <h2>This is the login page.</h2>} />
        <Route
          path={PASSWORD_FORGET}
          render={() => <h2>This is the password forget page.</h2>}
        />
        <Route
          path={ACCOUNT}
          render={() => <h2>This is the account page.</h2>}
        />
        <Route path={ADMIN} render={() => <h2>This is the admin page.</h2>} />
        <Route path={BOOKS} render={() => <h2>This is the books page.</h2>} />
        <Route
          path={BOOK_DETAIL}
          render={() => <h2>This is the book detail page.</h2>}
        />
        <Route
          path={ADD_BOOK}
          render={() => <h2>This is the add book page.</h2>}
        />
      </Switch>
    </div>
  </React.Fragment>
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
