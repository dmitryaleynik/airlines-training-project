// @flow
import React from 'react';
import { Route, Link, } from 'react-router-dom';
import Home from 'src/components/Home';
import SignUp from 'src/components/SignUp';
import SignIn from 'src/components/SignIn';
import NewFlight from 'src/components/NewFlight/container';
import UserPage from 'src/components/UserPage/container';
import OrderInfo from 'src/components/OrderInfo/container';

import './styles.scss';

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
        <li className="nav-item">
          <Link className="nav-link" to="/orders">
            {/* Temporary added for development convenience */}
            UP
          </Link>
        </li>
      </ul>
    </nav>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/new-flight" component={NewFlight} />
      <Route exact path="/orders" component={UserPage} />
      <Route path="/orders/:id" component={OrderInfo} />
    </div>
  </div>
);

export default App;
