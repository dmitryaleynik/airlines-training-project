import React from 'react';
import { NavLink, } from 'react-router-dom';
import { RenderredLink, } from 'src/utils/renderField';

import './styles.scss';

const Header = (props) => (
  <nav className="header navbar navbar-light">
    <NavLink className="navbar-brand" to={props.isAuthorized ? '/orders' : '/'}>
      Airlines
    </NavLink>
    {!props.isAuthorized && (
      <ul className="nav">
        <RenderredLink path="/sign-up">Sign up</RenderredLink>
        <RenderredLink path="/sign-in">Sign in</RenderredLink>
      </ul>
    )}
    {props.isAuthorized && (
      <ul className="nav">
        <RenderredLink path="/orders">Orders</RenderredLink>
        <RenderredLink path="/profile">Profile</RenderredLink>
        <li className="nav-item">
          <span className="nav-link">Logout</span>
        </li>
      </ul>
    )}
  </nav>
);

export default Header;
