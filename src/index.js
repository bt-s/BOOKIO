import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';

import Form from './components/Form/Form';
import List from './components/List/List';
import Post from './components/Post/Post';
import Loader from './components/Loader/Loader';

import './styling/style.scss';

const App = () => (
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
