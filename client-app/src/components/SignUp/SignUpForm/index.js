// @flow
import React from 'react';
import { Form, StyledText, } from 'react-form';
import type { SignUpFormFields, } from 'src/types';

type Props = {
  onSubmit: Function,
  validator: SignUpFormFields => SignUpFormFields,
};

const SignUpForm = (props: Props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      dontValidateOnMount
      validateOnSubmit
      validateError={props.validator}
    >
      {formApi => (
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <StyledText
              type="password"
              field="confirmPassword"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </Form>
  );
};

export default SignUpForm;
