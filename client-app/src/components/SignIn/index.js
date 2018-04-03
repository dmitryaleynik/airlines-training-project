import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import SignInForm from './SignInForm';
import { routes, } from 'src/imports';
import Loader from 'src/components/Loader';
import './styles.scss';

class SignIn extends Component {
  handleSubmit = (values) => {
    this.props.authorize(values);
  };

  componentWillUpdate = (nextProps) => {
    if (nextProps.isSuccess) {
      this.props.history.push(routes.HOME);
    }
  }

  componentWillUnmount = () => {
    this.props.destroy();
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-center sign-in">
        {this.props.isFetching && <Loader />}
        {!this.props.isFetching && (
          <div className="content">
            <h2>Sign in</h2>
            <SignInForm onSubmit={this.handleSubmit} />
            {this.props.errorMessage}
            <div className="mt-4">
              Are you new?{' '}
              <Link className="text-dark" to="/sign-up">
                Sign up
              </Link>{' '}
              now!
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SignIn;
