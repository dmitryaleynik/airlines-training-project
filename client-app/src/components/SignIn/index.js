import React, { Component, } from 'react';
import Form from './Form';
import { emailValidator, passwordValidator, } from 'src/validators';
// import './styles.css';

class SignIn extends Component {
  handleSubmit(a, b, c) {
    // window.location.href = `${window.location.origin}`;
  }

  validateForm(value) {
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
