// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import { createStore, applyMiddleware, } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger, } from 'redux-logger';
import { Provider, } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import clientApp from 'src/reducers';
import App from 'src/components/App';
import './index.css';

const loggerMiddleware = createLogger();

const store = createStore(
  clientApp,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  (document.getElementById('root'): any)
);
