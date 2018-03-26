// @flow
import React from 'react';
import Header from 'src/components/Header';
import Routes from './routes';
import './styles.scss';

const App = (props) => (
  <div className="root">
    <Header isAuthorized={false} />
    <div className="content container">
      <Routes />
      {/*
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
