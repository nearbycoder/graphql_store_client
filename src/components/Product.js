import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <span>{product.name}</span>
        <span>{product.description}</span>
        {product.imageUrl && <img src={product.imageUrl} />}
      </div>
    );
  }
}
