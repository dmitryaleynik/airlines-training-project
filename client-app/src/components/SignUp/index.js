import React, { Component, } from 'react';
import Form from './Form';
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from 'src/validators';
import './styles.css';

class SignUp extends Component {
  handleSubmit(e) {}

  validateForm(value) {
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
      <div>
        <h2>Sign up</h2>
        <Form onSubmit={this.handleSubmit} validator={this.validateForm} />
      </div>
    );
  }
}

export default SignUp;
