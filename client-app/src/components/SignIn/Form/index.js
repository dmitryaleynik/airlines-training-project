import React, { Component } from 'react';

const Form = (props) => {
  const {
    change, submit, formErrors, isValid,
  } = props;
  return (
    <form onChange={change} onSubmit={submit} className="sign-up-form" noValidate>
      <div className="form-group">
        <label htmlFor="email">
          Email address
          <input type="email" className="form-control" name="email" />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          Password
          <input type="password" className="form-control" name="password" />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Sign in
      </button>
    </form>
  );
};

export default Form;
