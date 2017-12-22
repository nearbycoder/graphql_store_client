import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ProductHome, ProductShow } from './containers/product';
import { Alert } from './components';
import { SignUp, SignIn } from './containers/auth';
import { GuestAuthRoute, SimpleAuthRoute } from './components';
export default class Routes extends Component {
  render() {
    return (
      <div>
        <Alert />
        <Switch>
          <GuestAuthRoute exact path="/" component={ProductHome} />
          <GuestAuthRoute exact path="/products/:id" component={ProductShow} />
          <SimpleAuthRoute path="/signup" redirectAuth="/" component={SignUp} />
          <SimpleAuthRoute path="/signin" redirectAuth="/" component={SignIn} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
