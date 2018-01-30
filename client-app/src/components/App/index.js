// @flow
import React from 'react';
import { Route, Link, } from 'react-router-dom';
import Home from 'src/components/Home';
import SignUp from 'src/components/SignUp';
import SignIn from 'src/components/SignIn';
import UserPage from 'src/components/UserPage';
import './styles.css';

const App = () => (
  <div className="root container">
    <nav className="navbar navbar-light">
      <Link className="navbar-brand" to="/">
        Airlines
      </Link>
      <ul className="nav">
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
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/user-page" component={UserPage} />
    </div>
  </div>
);

export default App;
