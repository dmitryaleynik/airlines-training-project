import React from 'react';
import { Switch, withRouter, } from 'react-router-dom';
import AuthRoute from 'src/components/AuthRoute/container';
import Home from 'src/components/Home';
import SignUp from 'src/components/SignUp/container';
import SignIn from 'src/components/SignIn/container';
import NewFlight from 'src/components/NewFlight/container';
import UserPage from 'src/components/UserPage/container';
import OrderInfo from 'src/components/OrderInfo/container';
import UserProfile from 'src/components/UserProfile/container';
import ErrorPage from 'src/components/ErrorPage';
import { routes, } from 'src/imports';

const Routes = () => {
  return (
    <Switch>
      <AuthRoute path={routes.SIGN_UP} component={SignUp} noAuthRequired />
      <AuthRoute path={routes.SIGN_IN} component={SignIn} noAuthRequired />
      <AuthRoute path={routes.PROFILE} component={UserPage} userAuthRequired />
      <AuthRoute path={routes.ORDER} component={OrderInfo} userAuthRequired />
      <AuthRoute
        path={routes.NEW_FLIGHT}
        component={NewFlight}
        userAuthRequired
      />
      <AuthRoute
        path={routes.SETTINGS}
        component={UserProfile}
        userAuthRequired
      />
      <AuthRoute exact path={routes.HOME} component={Home} noAuthRequired />
      <AuthRoute component={ErrorPage} />
    </Switch>
  );
};

export default withRouter(Routes);
