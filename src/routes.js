import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './containers/shared';
import { ProductHome, ProductShow } from './containers/product';

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={ProductHome} />
          <Route exact path="/products/:id" component={ProductShow} />
        </Switch>
      </div>
    );
  }
}
