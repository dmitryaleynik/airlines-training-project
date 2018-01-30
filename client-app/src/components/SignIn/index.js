// @flow
import React, { Component, } from 'react';
import SignInForm from './SignInForm';
import { emailValidator, passwordValidator, } from 'src/utils/validators';
import { SignInFormFields, } from '../../types';
import './styles.css';

class SignIn extends Component<{}, {}> {
  handleSubmit(a: SignInFormFields, b: Event, c: Object) {
    // window.location.href = `${window.location.origin}`;
  }

  validateForm(value: SignInFormFields): SignInFormFields {
    return {
      email: emailValidator(value.email),
      password: passwordValidator(value.password),
    };
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-center">
        <div className="content">
          <h2>Sign in</h2>
          <SignInForm
            onSubmit={this.handleSubmit}
            validator={this.validateForm}
          />
        </div>
      </div>
    );
  }
}

export default SignIn;
