import React, { Component } from 'react';
import { AuthRoute } from '../';

export default class SimpleAuthRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <AuthRoute
        {...props}
        render={(props, user) => (
          <div>
            <Component {...props} user={user} />
          </div>
        )}
      />
    );
  }
}
