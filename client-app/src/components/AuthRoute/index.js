import React from 'react';
import { Redirect, Route, } from 'react-router-dom';
import { routes, } from 'src/imports';

const AuthRoute = (props) => {
  const { component, token, noAuthRequired, userAuthRequired, } = props;
  let redirectTo = props.redirectTo;

  if (userAuthRequired && !token) {
    redirectTo = redirectTo || routes.SIGN_IN;
    return <Redirect to={redirectTo} push />;
  }

  if (noAuthRequired && token) {
    redirectTo = redirectTo || routes.PROFILE;
    return <Redirect to={redirectTo} push />;
  }

  return <Route {...props} component={component} />;
};

export default AuthRoute;
