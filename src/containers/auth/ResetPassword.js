import React, { Component } from 'react';
import AuthForm from './shared/AuthForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AlertService } from '../../lib';
import queryString from 'query-string';

class ResetPassword extends Component {
  update = (proxy, { data: { resetPassword: { errors } } }) => {
    if (errors.length > 0) {
      AlertService('warning', errors);
      return;
    }
    AlertService('success', 'Your Password Has Been Updated!');

    this.props.history.push('/');
  };

  componentDidMount = () => {
    const params = queryString.parse(window.location.search);
    if (params.uid && params.token && params.client_id) {
      this.setState({ token: params.token });
      window.setTimeout(() => {
        localStorage.setItem(
          'auth_headers',
          JSON.stringify({
            uid: params.uid,
            client: params.client_id,
            'access-token': params.token
          })
        );
      }, 0);
    } else {
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <AuthForm
        actionText="Reset Password"
        resetPassword={true}
        update={this.update}
        submitAction={this.props.resetPassword}
      />
    );
  }
}

const resetPassword = gql`
  mutation resetPassword($user: UserResetPasswordType!) {
    resetPassword(user: $user) {
      client
      accessToken
      uid
      errors
    }
  }
`;

export default graphql(resetPassword, { name: 'resetPassword' })(ResetPassword);
