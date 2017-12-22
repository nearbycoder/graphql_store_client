import React, { Component } from 'react';
import { AuthRoute } from './';
import { Redirect } from 'react-router-dom';
import { Header } from '../shared';

export default class UserAuthRoute extends Component {
  notLoggedIn = user => {
    return !user;
  };
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <AuthRoute
        {...props}
        render={(props, user, signOut) => (
          <div>
            {this.notLoggedIn(user) && <Redirect to="/" />}
            <Header {...props} user={user} signOut={signOut} />
            <Component {...props} user={user} />
          </div>
        )}
      />
    );
  }
}
