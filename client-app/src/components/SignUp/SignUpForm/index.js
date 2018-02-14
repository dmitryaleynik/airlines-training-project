// @flow
import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import validate from 'src/utils/validate';
import renderField from 'src/utils/renderField';

type Props = {
  onSubmit: Function,
};

let SignUpForm = (props: Props) => {
  return (
    <form onSubmit={props.handleSubmit} noValidate="true">
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <Field
        name="confirmPassword"
        type="confirmPassword"
        component={renderField}
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
