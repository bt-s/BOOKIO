import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Loader from './components/Loader/Loader';

import './styling/style.scss';

class App extends React.Component {
  render() {
    return <Loader />;
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
