import React, { Component } from 'react';
import { AuthRoute } from './';
import { Redirect } from 'react-router-dom';
import { Header } from '../shared';

export default class AdminAuthRoute extends Component {
  notAdmin = user => {
    return !user || (user && !user.isAdmin);
  };
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <AuthRoute
        {...props}
        render={(props, user, signOut) => (
          <div>
            {this.notAdmin(user) && <Redirect to="/" />}
            <Header {...props} user={user} signOut={signOut} />
            <Component {...props} user={user} />
          </div>
        )}
      />
    );
  }
}
