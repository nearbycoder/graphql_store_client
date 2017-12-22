import React, { Component } from 'react';
import AuthForm from './shared/AuthForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { AlertService } from '../../lib';

class SignIn extends Component {
  update = (
    proxy,
    { data: { signInUser: { uid, client, accessToken, errors } } }
  ) => {
    if (errors) {
      AlertService('warning', errors);
      return;
    }
    AlertService('success', 'You Are Now Signed In!');
    localStorage.setItem(
      'auth_headers',
      JSON.stringify({ uid, client, 'access-token': accessToken })
    );

    this.props.history.push('/');
  };

  render() {
    return (
      <AuthForm
        signIn={true}
        update={this.update}
        submitAction={this.props.signInUser}
      />
    );
  }
}

const signInUser = gql`
  mutation signInUser($user: UserSignInType!) {
    signInUser(user: $user) {
      client
      accessToken
      uid
      errors
    }
  }
`;

export default graphql(signInUser, { name: 'signInUser' })(SignIn);
