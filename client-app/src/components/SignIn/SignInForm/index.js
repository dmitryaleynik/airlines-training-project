// @flow
import React from 'react';
import { Field, reduxForm, } from 'redux-form';
import validate from 'src/utils/validate';
import renderField from 'src/utils/renderField';

type Props = {
  onSubmit: Function,
};

let SignInForm = (props: Props) => {
  return (
    <form onSubmit={props.handleSubmit} noValidate="true">
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={renderField}
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
