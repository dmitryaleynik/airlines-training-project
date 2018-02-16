// @flow
import React from 'react';
import { Route, Redirect, } from 'react-router-dom';
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import SignUp from 'src/components/SignUp';
import SignIn from 'src/components/SignIn';
import NewFlight from 'src/components/NewFlight/container';
import UserPage from 'src/components/UserPage/container';
import OrderInfo from 'src/components/OrderInfo/container';
import UserProfile from 'src/components/UserProfile/container';

import './styles.scss';

const isAuthorized = false;

const App = () => (
  <div className="root container">
    <Header isAuthorized={isAuthorized} />
    <div>
      <Route
        exact
        path="/"
        render={() => (isAuthorized ? <Redirect to="/orders" /> : <Home />)}
      />
      <Route
        path="/sign-up"
        render={() => (isAuthorized ? <Redirect to="/orders" /> : <SignUp />)}
      />
      <Route
        path="/sign-in"
        render={() => (isAuthorized ? <Redirect to="/orders" /> : <SignIn />)}
      />
      <Route
        path="/new-flight"
        render={() =>
          !isAuthorized ? <Redirect to="/sign-in" /> : <NewFlight />
        }
      />
      <Route
        exact
        path="/orders"
        render={() =>
          !isAuthorized ? <Redirect to="/sign-in" /> : <UserPage />
        }
      />
      <Route
        path="/orders/:id"
        render={() =>
          !isAuthorized ? <Redirect to="/sign-in" /> : <OrderInfo />
        }
      />
      <Route
        path="/profile"
        render={() =>
          !isAuthorized ? <Redirect to="/sign-in" /> : <UserProfile />
        }
      />
    </div>
  </div>
);

export default App;
