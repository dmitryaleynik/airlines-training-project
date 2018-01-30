// @flow
import React, { Component, } from 'react';
import SignInForm from './SignInForm';
import { emailValidator, passwordValidator, } from 'src/utils/validators';
import type { SignInFormFields, } from 'src/types';
// import './styles.css';

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
      <div>
        <h2>Sign in</h2>
        <SignInForm
          onSubmit={this.handleSubmit}
          validator={this.validateForm}
        />
      </div>
    );
  }
}

export default SignIn;
