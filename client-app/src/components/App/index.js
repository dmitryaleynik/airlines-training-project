// @flow
import React from 'react';
import Header from 'src/components/Header/container';
import Routes from './routes';
import './styles.scss';

const App = () => (
  <div className="root">
    <Header />
    <div className="content container">
      <Routes />
    </div>
    <footer className="footer">
      <span>iTechArt 2018</span>
    </footer>
  </div>
);

export default App;
