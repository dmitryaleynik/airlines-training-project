// @flow
import React from 'react';
import { Route, Link, } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => (
  <div className="container">
    <nav className="navbar navbar-light">
      <Link className="navbar-brand" to="/">
        Airlines
      </Link>
      <ul className="navbar-nav" id="navbarNav">
        <li className="nav-item">
          <Link className="nav-link" to="/sign-up">
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sign-in">
            Sign in
          </Link>
        </li>
      </ul>
    </nav>
    <div className="content row justify-content-center">
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
    </div>
  </div>
);

export default App;
