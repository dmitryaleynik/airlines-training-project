// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import SignInForm from './SignInForm';

import type { SignInFormFields, } from 'src/types';

import './styles.scss';

class SignIn extends Component<{}, {}> {
  handleSubmit(values: SignInFormFields) {
    // window.location.href = `${window.location.origin}`;
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-center sign-in">
        <div className="content">
          <h2>Sign in</h2>
          <SignInForm onSubmit={this.handleSubmit} />
          <div className="mt-4">
            Are you new?{' '}
            <Link className="text-dark" to="/sign-up">
              Sign up
            </Link>{' '}
            now!
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
