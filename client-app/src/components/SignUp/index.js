// @flow
import React, { Component } from 'react';
import Form from './Form';
import FormErrors from '../FormErrors';
import './styles.css';

class SignUp extends Component {
  state = {
    formErrors: { email: '', password: '', confirmPassword: '' },
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
    formValid: false,
  };

  submit(e) {
    e.preventDefault();
    console.log(e.target.elements.email.value);
    window.location.href = `${window.location.origin}`;
  }

  change(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let {
      formErrors, emailValid, passwordValid, confirmPasswordValid,
    } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = /^[a-z][a-z0-9]*@[a-z0-9]+\.[a-z]+$/i.test(value);
        formErrors.email = emailValid ? '' : 'email is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid ? '' : 'password is too short';
        break;
      case 'confirmPassword':
        confirmPasswordValid = value === this.state.password;
        formErrors.confirmPassword = confirmPasswordValid ? '' : "passwords don't match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid,
        confirmPasswordValid,
      },
      this.validateForm,
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid,
    });
  }

  render() {
    const {
      email, password, confirmPassword, formValid,
    } = this.state;
    return (
      <div>
        <Form
          email={email}
          password={password}
          formErrors={this.state.formErrors}
          confirmPassword={confirmPassword}
          submit={this.submit}
          change={this.change.bind(this)}
          isValid={formValid}
        />
      </div>
    );
  }
}

export default SignUp;
