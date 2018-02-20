// @flow
import React from 'react';
import { Route, Redirect, Switch, } from 'react-router-dom';
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import SignUp from 'src/components/SignUp';
import SignIn from 'src/components/SignIn';
import NewFlight from 'src/components/NewFlight/container';
import UserPage from 'src/components/UserPage/container';
import OrderInfo from 'src/components/OrderInfo/container';
import UserProfile from 'src/components/UserProfile/container';
import ErrorPage from 'src/components/ErrorPage';

import './styles.scss';

const isAuthorized = true;

const App = () => (
  <div className="root">
    <Header isAuthorized={isAuthorized} />
    <div className="content container">
      <Switch>
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
          render={(props) =>
            !isAuthorized ? (
              <Redirect to="/sign-in" />
            ) : (
              <NewFlight {...props} />
            )
          }
        />
        <Route
          exact
          path="/orders"
          render={(props) =>
            !isAuthorized ? <Redirect to="/sign-in" /> : <UserPage {...props} />
          }
        />
        <Route
          path="/orders/:id"
          render={(props) =>
            !isAuthorized ? (
              <Redirect to="/sign-in" />
            ) : (
              <OrderInfo {...props} />
            )
          }
        />
        <Route
          path="/profile"
          render={() =>
            !isAuthorized ? <Redirect to="/sign-in" /> : <UserProfile />
          }
        />
        <Route component={ErrorPage} />
      </Switch>
    </div>
    <footer className="footer">
      <span>iTechArt 2018</span>
    </footer>
  </div>
);

export default App;
