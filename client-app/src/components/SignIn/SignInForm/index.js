// @flow
import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import validate from 'src/utils/validate';
import { renderInputWithLabel, } from 'src/utils/renderField';

type Props = {
  onSubmit: Function,
};

let SignInForm = (props: Props) => {
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
      <button className="btn btn-dark mt-3" type="submit">
        Submit
      </button>
    </form>
  );
};

SignInForm = reduxForm({
  form: 'sign-in',
  validate,
})(SignInForm);

export default SignInForm;
