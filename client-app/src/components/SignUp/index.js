// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import SignUpForm from './SignUpForm';

import type { SignUpFormFields, } from 'src/types';

import './styles.scss';

class SignUp extends Component<{}, {}> {
  handleSubmit(values: SignUpFormFields) {}

  render() {
    return (
      <div className="d-flex flex-row justify-content-center sign-up">
        <div className="content">
          <h2>Sign up</h2>
          <SignUpForm onSubmit={this.handleSubmit} />
          <div className="mt-4">
            Already have an account?{' '}
            <Link className="text-dark" to="/sign-in">
              Sign in
            </Link>!
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
