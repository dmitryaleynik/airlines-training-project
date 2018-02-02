// @flow
import React from 'react';
import { Form, StyledText, } from 'react-form';
import { SignInFormFields, } from '../../../types';

type Props = {
  onSubmit: Function,
  validator: (value: SignInFormFields) => SignInFormFields,
};

const SignInForm = (props: Props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      dontValidateOnMount
      validateOnSubmit
      validateError={props.validator}
    >
      {(formApi) => (
        <form onSubmit={formApi.submitForm} name="signInForm">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <StyledText field="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <StyledText
              type="password"
              field="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      )}
    </Form>
  );
};

export default SignInForm;
