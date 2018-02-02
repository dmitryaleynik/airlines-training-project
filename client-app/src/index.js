// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import { createStore, } from 'redux';
import { Provider, } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import clientApp from 'src/reducers';
import App from 'src/components/App';
import './index.scss';

const store = createStore(clientApp);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  (document.getElementById('root'): any)
);
