// @flow
import React, { Component, } from 'react';
import SignUpForm from './SignUpForm';
import './styles.scss';

class SignUp extends Component<{}, {}> {
  handleSubmit(values) {}

  render() {
    return (
      <div className="d-flex flex-row justify-content-center sign-up">
        <div className="content">
          <h2>Sign up</h2>
          <SignUpForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default SignUp;
