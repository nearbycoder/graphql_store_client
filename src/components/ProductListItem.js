import React, { Component } from 'react';
import { Cell } from 'styled-css-grid';
import styled from 'styled-components';
import { priceFormatter } from '../lib';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardActions } from './';
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
    const { product, user } = this.props;
    return (
      <Cell style={{ overflow: 'visible' }}>
        <Card>
          {product.imageUrl && (
            <Link to={`products/${product.id}`}>
              <Img src={product.imageUrl} />
            </Link>
          )}
          <CardBody>
            <h5>
              <Link to={`products/${product.id}`}>
                <span>{product.name}</span>
              </Link>
            </h5>
            <p style={{ minHeight: '50px', padding: '5px 0' }}>
              {product.description}
            </p>
            <CardActions>
              <label>
                <select defaultValue="" onChange={this.handleChange}>
                  <option default>Choose a variant</option>
                  {product.variants.map((variant, index) => (
                    <option key={index} value={variant.id}>
                      {variant.name} {priceFormatter(variant.price)}
                    </option>
                  ))}
                </select>
              </label>
              <button
                disabled={!this.state.selectedVariant || !user}
                className="pt-fill">
                {this.state.selectedVariant &&
                  priceFormatter(this.state.selectedVariant.price)}{' '}
                {user ? 'Add to Cart' : 'Please Login to Buy'}
              </button>
            </CardActions>
          </CardBody>
        </Card>
      </Cell>
    );
  }
}
