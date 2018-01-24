import React, { Component } from 'react';

const Form = props => (
  <form onChange={props.change} onSubmit={props.submit} className="sign-up-form" noValidate>
    <h2>Sign up</h2>
    <div className="form-group">
      <label htmlFor="email">
        Email address
        <input type="email" className="form-control" name="email" />
      </label>
    </div>
    <div className="form-group">
      <label htmlFor="password">
        Password
        <input type="password" className="form-control" name="password" />
      </label>
    </div>
    <div className="form-group">
      <label htmlFor="password">
        Confirm password
        <input type="password" className="form-control" name="confirmPassword" />
      </label>
    </div>
    <button type="submit" className="btn btn-primary" disabled={!props.isValid}>
      Sign up
    </button>
  </form>
);

export default Form;
