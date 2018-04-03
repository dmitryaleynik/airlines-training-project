// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import Loader from 'src/components/Loader';
import SignUpForm from './SignUpForm';
import { routes, } from 'src/imports';
import './styles.scss';

class SignUp extends Component {
  handleSubmit = async (values) => {
    this.props.register(values);
  };

  componentWillUpdate = (nextProps) => {
    if (nextProps.isSuccess) {
      this.props.history.push(routes.SIGN_IN);
    }
  }

  componentWillUnmount = () => {
    this.props.destroy();
  }

  render() {
    return (
      <div>
        {this.props.isFetching && <Loader />}
        {!this.props.isFetching && (
          <div className="d-flex flex-row justify-content-center sign-up">
            <div className="content">
              <h2>Sign up</h2>
              <SignUpForm onSubmit={this.props.register} />
              <div>{this.props.errorMessage}</div>
              <div className="mt-4">
                Already have an account?{' '}
                <Link className="text-dark" to="/sign-in">
                  Sign in
                </Link>!
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SignUp;
