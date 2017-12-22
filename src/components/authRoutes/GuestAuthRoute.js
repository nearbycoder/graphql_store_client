import React, { Component } from 'react';
import { AuthRoute } from './';
import { Header } from '../shared';

export default class GuestAuthRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <AuthRoute
        {...props}
        render={(props, user, signOut) => (
          <div>
            <Header {...props} user={user} signOut={signOut} />
            <Component {...props} user={user} />
          </div>
        )}
      />
    );
  }
}
