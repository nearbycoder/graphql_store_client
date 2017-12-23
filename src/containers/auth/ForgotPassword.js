import React, { Component } from 'react';
import AuthForm from './shared/AuthForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AlertService } from '../../lib';

class ForgotPassword extends Component {
  update = (proxy, { data, data: { forgotPassword: { success, errors } } }) => {
    if (errors) {
      console.log(data);
      AlertService('warning', errors);
      return;
    }
    AlertService('success', 'An Email has been sent for password reset!');
  };

  render() {
    return (
      <AuthForm
        actionText="Send Reset Email"
        forgotPassword={true}
        update={this.update}
        submitAction={this.props.forgotPassword}
      />
    );
  }
}

const forgotPassword = gql`
  mutation forgotPassword($user: UserForgotPasswordType!) {
    forgotPassword(user: $user) {
      success
      errors
    }
  }
`;

export default graphql(forgotPassword, { name: 'forgotPassword' })(
  ForgotPassword
);
