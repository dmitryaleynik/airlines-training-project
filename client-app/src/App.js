import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Contact from './components/Contact';

const App = () => (
  <HashRouter>
    <div>
      <header className="header">
        <div className="logo nav-button">
          <NavLink to="/">Home</NavLink>
        </div>
        <ul className="nav-buttons">
          <li className="sign-in nav-button">
            <NavLink to="/sign-in">Sign in</NavLink>
          </li>
          <li className="sign-up nav-button">
            <NavLink to="/sign-up">Sign up</NavLink>
          </li>
        </ul>
      </header>
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/contact" component={Contact} />
      </div>
    </div>
  </HashRouter>
);

export default App;
