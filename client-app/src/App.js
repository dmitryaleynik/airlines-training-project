import React from 'react';
import { Route, NavLink, HashRouter, } from 'react-router-dom';
import Home from 'src/components/Home';
import SignUp from 'src/components/SignUp';
import SignIn from 'src/components/SignIn';
import UserPage from 'src/components/UserPage';

const App = () => (
  <HashRouter>
    <div className="container">
      <nav className="navbar navbar-light">
        <NavLink className="navbar-brand" to="/">
          Airlines
        </NavLink>
        <ul className="navbar-nav" id="navbarNav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/sign-up">
              Sign up
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sign-in">
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="content row">
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/user-page" component={UserPage} />
      </div>
    </div>
  </HashRouter>
);

export default App;
