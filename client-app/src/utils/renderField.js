import React from 'react';
import { NavLink, } from 'react-router-dom';

export const renderInputWithLabel = ({
  input,
  label,
  className,
  type,
  meta: { touched, error, warning, },
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input {...input} className={className} type={type} />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export const renderInput = ({
  input,
  label,
  className,
  type,
  meta: { touched, error, warning, },
}) => {
  return (
    <div className="form-group">
      <input {...input} className={className} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderInputWithHints = (props) => {
  const {
    input,
    list,
    className,
    type,
    meta: { touched, error, warning, },
  } = props;
  return (
    <div>
      <input {...input} className={className} list={list} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export const RenderredLink = ({ path, children, }) => (
  <li className="nav-item">
    <NavLink className="nav-link" activeClassName="nav-link-active" to={path}>
      {children}
    </NavLink>
  </li>
);
