// @flow
import React, { Component, } from 'react';
import SignUpForm from './SignUpForm';
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from 'src/utils/validators';
import { SignUpFormFields, } from '../../types';
import './styles.scss';

class SignUp extends Component<{}, {}> {
  handleSubmit(e: SignUpFormFields) {}

  validateForm(value: SignUpFormFields): SignUpFormFields {
    return {
      email: emailValidator(value.email),
      password: passwordValidator(value.password),
      confirmPassword: confirmPasswordValidator(
        value.password,
        value.confirmPassword
      ),
    };
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-center sign-up">
        <div className="content">
          <h2>Sign up</h2>
          <SignUpForm
            onSubmit={this.handleSubmit}
            validator={this.validateForm}
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
