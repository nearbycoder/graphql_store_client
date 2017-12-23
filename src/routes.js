import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ProductHome, ProductShow } from './containers/product';
import { NotFound } from './containers/notFound';
import { Alert } from './components';
import {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword
} from './containers/auth';
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
          <SimpleAuthRoute
            path="/forgot-password"
            redirectAuth="/"
            component={ForgotPassword}
          />
          <SimpleAuthRoute
            path="/reset-password"
            redirectAuth="/"
            component={ResetPassword}
          />
          <SimpleAuthRoute path="/not-found" component={NotFound} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
