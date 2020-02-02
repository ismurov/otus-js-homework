import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import Routes from './routes';
import * as serviceWorker from './utils/serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

if (process.env.NODE_ENV === "development") {
  console.log("Store:", store.getState());
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
