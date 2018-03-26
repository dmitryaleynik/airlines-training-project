import React from 'react';
import { NavLink, } from 'react-router-dom';
import { RenderredLink, } from 'src/utils/renderField';
import { routes, } from 'src/imports';

import './styles.scss';

const Header = (props) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = 'http://localhost:3000/';
  }

  return (
    <nav className="header navbar navbar-light">
      <NavLink className="navbar-brand" to={props.isAuthorized ? '/orders' : '/'}>
        Airlines
    </NavLink>
      {!props.isAuthorized && (
        <ul className="nav">
          <RenderredLink path={routes.SIGN_UP}>Sign up</RenderredLink>
          <RenderredLink path={routes.SIGN_IN}>Sign in</RenderredLink>
        </ul>
      )}
      {props.isAuthorized && (
        <ul className="nav">
          <RenderredLink path="/orders">Orders</RenderredLink>
          <RenderredLink path="/profile">Profile</RenderredLink>
          <li className="nav-item">
            <a onClick={handleLogout} className="nav-link">Logout</a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Header;
