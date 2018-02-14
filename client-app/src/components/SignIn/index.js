// @flow
import React, { Component, } from 'react';
import SignInForm from './SignInForm';

import './styles.scss';

class SignIn extends Component<{}, {}> {
  handleSubmit(values) {
    // window.location.href = `${window.location.origin}`;
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-center sign-in">
        <div className="content">
          <h2>Sign in</h2>
          <SignInForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default SignIn;
