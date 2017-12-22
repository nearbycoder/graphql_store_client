import React, { Component } from 'react';
import AuthForm from './shared/AuthForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AlertService } from '../../lib';

class SignUp extends Component {
  update = (
    proxy,
    { data: { registerUser: { uid, client, accessToken, errors } } }
  ) => {
    if (errors) {
      AlertService('warning', errors);
      return;
    }
    AlertService('success', 'Your Account Has Been Created Successfully!');
    localStorage.setItem(
      'auth_headers',
      JSON.stringify({ uid, client, 'access-token': accessToken })
    );
    this.props.history.push('/');
  };

  render() {
    return (
      <AuthForm update={this.update} submitAction={this.props.registerUser} />
    );
  }
}

const registerUser = gql`
  mutation registerUser($user: UserInputType!) {
    registerUser(user: $user) {
      client
      accessToken
      uid
      errors
    }
  }
`;

export default graphql(registerUser, { name: 'registerUser' })(SignUp);
