import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Contact from './components/Contact';

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
      <div className="content row justify-content-center">
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    </div>
  </HashRouter>
);

export default App;
