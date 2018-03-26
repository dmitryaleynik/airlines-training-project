// @flow
import React from 'react';
import { Route, Redirect, Switch, } from 'react-router-dom';
import Header from 'src/components/Header';
import Routes from './routes';
import './styles.scss';

const isAuthorized = false;

const App = () => (
  <div className="root">
    <Header isAuthorized={isAuthorized} />
    <div className="content container">
      <Routes />
      {/* <Switch>
        <Route
          exact
          path="/"
          render={() => (isAuthorized ? <Redirect to="/orders" /> : <Home />)}
        />
        <Route
          path="/sign-up"
          render={(props) =>
            isAuthorized ? <Redirect to="/orders" /> : <SignUp {...props} />
          }
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
      </Switch> */}
    </div>
    <footer className="footer">
      <span>iTechArt 2018</span>
    </footer>
  </div>
);

export default App;
