// @flow
import React, { Component } from 'react';
import Form from './Form';
import FormErrors from '../FormErrors';
// import './styles.css';

type State = {
  formErrors: {
    
  }
}

class SignIn extends Component {
  state = {
    formErrors: { email: '', password: '' },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  };
  
  submit(e) {
    console.log(2122);
    e.preventDefault();
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
      formErrors, emailValid, passwordValid,
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
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid,
      },
      this.validateForm,
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid && this.state.passwordValid,
    });
  }

  render() {
    const {
      email, password, formValid,
    } = this.state;
    return (
      <div>
        <h2>Sign in</h2>
        <Form
          email={email}
          password={password}
          formErrors={this.state.formErrors}
          submit={this.submit}
          change={this.change.bind(this)}
          isValid={formValid}
        />
      </div>
    );
  }
}

export default SignIn;
