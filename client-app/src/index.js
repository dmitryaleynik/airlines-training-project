/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, } from 'redux';
import { Provider, } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import clientApp from 'src/reducers';
import App from 'src/components/App';
import './index.css';

const store = createStore(clientApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
