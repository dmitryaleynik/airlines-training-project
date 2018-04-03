import React from 'react';
import { NavLink, } from 'react-router-dom';
import { RenderredLink, } from 'src/utils/renderField';
import { routes, } from 'src/imports';

import './styles.scss';

const Header = (props) => {
  return (
    <nav className="header navbar navbar-light">
      <NavLink
        className="navbar-brand"
        to={props.token ? routes.PROFILE : routes.HOME}
      >
        Airlines
      </NavLink>
      {!props.token && (
        <ul className="nav">
          <RenderredLink path={routes.SIGN_UP}>Sign up</RenderredLink>
          <RenderredLink path={routes.SIGN_IN}>Sign in</RenderredLink>
        </ul>
      )}
      {props.token && (
        <ul className="nav">
          <RenderredLink path={routes.PROFILE}>Orders</RenderredLink>
          <RenderredLink path={routes.SETTINGS}>Profile</RenderredLink>
          <li className="nav-item">
            <span onClick={props.logout} className="nav-link">
              Logout
            </span>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
