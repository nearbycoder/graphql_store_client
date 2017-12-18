import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './containers/shared';
import { ProductHome, ProductShow } from './containers/product';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Routes extends Component {
  render() {
    const { loading, user } = this.props;
    if (loading) return null;
    return (
      <div>
        <Header user={user} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <ProductHome {...props} user={user} />}
          />
          <Route exact path="/products/:id" component={ProductShow} />
        </Switch>
      </div>
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

export default graphql(getCurrentUser, {
  skip: ownProps => skipAuthCheck(ownProps),
  options(props) {
    return {
      fetchPolicy: 'network-only'
    };
  },
  props({ data: { loading, user } }) {
    return {
      loading,
      user
    };
  }
})(Routes);

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
