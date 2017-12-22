import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Loading } from '../';
class AuthRoute extends Component {
  signOut = () => {
    try {
      if (localStorage.getItem('auth_headers') !== null) {
        const { uid, client } = JSON.parse(
          localStorage.getItem('auth_headers')
        );
        this.props.signOutUser({
          variables: { uid, client },
          update: (proxy, { data: { signOutUser: { success } } }) => {
            localStorage.removeItem('auth_headers');
            this.props.refetch();
          }
        });
      }
    } catch (e) {
      localStorage.removeItem('auth_headers');
    }
  };

  render() {
    const {
      loading,
      user,
      component: Component,
      redirectAuth,
      header: Header,
      render,
      ...props
    } = this.props;

    if (loading) return <Loading />;
    if (user && redirectAuth) return <Redirect to={redirectAuth} />;
    return (
      <Route {...props} render={props => render(props, user, this.signOut)} />
    );
  }
}

const getCurrentUser = gql`
  query getCurrentUser {
    user: validToken {
      email
      name
      isAdmin
    }
  }
`;

const signOutUser = gql`
  mutation signOutUser($client: String!, $uid: String!) {
    signOutUser(client: $client, uid: $uid) {
      success
    }
  }
`;

export default graphql(getCurrentUser, {
  skip: ownProps => skipAuthCheck(ownProps),
  options(props) {
    return {
      fetchPolicy: 'network-only'
    };
  },
  props({ data: { loading, user, refetch } }) {
    return {
      loading,
      refetch,
      user
    };
  }
})(graphql(signOutUser, { name: 'signOutUser' })(AuthRoute));

const skipAuthCheck = ownProps => {
  try {
    if (localStorage.getItem('auth_headers') !== null) {
      JSON.parse(localStorage.getItem('auth_headers'));
      return false;
    }
    return true;
  } catch (e) {
    return true;
  }
};
