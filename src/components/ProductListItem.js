import React, { Component } from 'react';
import { Cell } from 'styled-css-grid';
import styled from 'styled-components';
import { Card, Button } from '@blueprintjs/core';
import { priceFormatter } from '../lib';
import { Link } from 'react-router-dom';
const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export default class ProductListItem extends Component {
  state = {
    selectedVariant: null
  };

  handleChange = e => {
    this.setState({
      selectedVariant: this.props.product.variants.filter(
        variant => variant.id === e.target.value
      )[0]
    });
  };

  render() {
    const { product } = this.props;
    return (
      <Cell>
        <Card interactive={true} elevation={Card.ELEVATION_THREE}>
          <h5>
            <Link to={`products/${product.id}`}>
              <span>{product.name}</span>
            </Link>
          </h5>
          {product.imageUrl && (
            <Link to={`products/${product.id}`}>
              <Img src={product.imageUrl} />
            </Link>
          )}
          <p style={{ minHeight: '50px', padding: '5px 0' }}>
            {product.description}
          </p>
          <label className="pt-label .modifier">
            <div className="pt-select">
              <select defaultValue="" onChange={this.handleChange}>
                <option default>Choose a variant</option>
                {product.variants.map((variant, index) => (
                  <option key={index} value={variant.id}>
                    {variant.name} {priceFormatter(variant.price)}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <Button disabled={!this.state.selectedVariant} className="pt-fill">
            {this.state.selectedVariant &&
              priceFormatter(this.state.selectedVariant.price)}{' '}
            Add to Cart
          </Button>
        </Card>
      </Cell>
    );
  }
}
