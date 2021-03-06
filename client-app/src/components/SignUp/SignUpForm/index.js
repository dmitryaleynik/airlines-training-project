// @flow
import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import validate from 'src/utils/validate';
import { renderInputWithLabel, } from 'src/utils/renderField';

let SignUpForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} noValidate="true">
      <Field
        className="form-control"
        name="email"
        type="email"
        component={renderInputWithLabel}
        label="Email"
      />
      <Field
        className="form-control"
        name="password"
        type="password"
        component={renderInputWithLabel}
        label="Password"
      />
      <Field
        className="form-control"
        name="confirmPassword"
        type="password"
        component={renderInputWithLabel}
        label="Confirm Password"
      />
      <button className="btn btn-dark mt-3" type="submit">
        Submit
      </button>
    </form>
  );
};

SignUpForm = reduxForm({
  form: 'sign-up',
  validate,
})(SignUpForm);

export default SignUpForm;
