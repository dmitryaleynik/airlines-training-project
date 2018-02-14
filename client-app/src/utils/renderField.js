import React from 'react';

export default ({ input, label, type, meta: { touched, error, warning, }, }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      {...input}
      className="form-control"
      placeholder={label}
      type={type}
    />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);
