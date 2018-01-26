// @flow
import React, { Component, } from 'react';
import Form from './Form';
import { emailValidator, passwordValidator, } from 'src/validators';
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
        <Form onSubmit={this.handleSubmit} validator={this.validateForm} />
      </div>
    );
  }
}

export default SignIn;
