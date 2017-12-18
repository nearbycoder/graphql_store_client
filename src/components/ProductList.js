import React, { Component } from 'react';
import { Grid } from 'styled-css-grid';
import { ProductListItem } from './';

export default class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <Grid
          style={{
            maxWidth: '860px',
            margin: '50px auto 20px',
            padding: '0 20px'
          }}
          columns="repeat(auto-fill, minmax(250px, 1fr))"
          gap="20px"
          justifyContent="space-around">
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Grid>
        <Grid
          style={{
            maxWidth: '860px',
            margin: '0px auto 30px',
            padding: '0 20px'
          }}
          columns="1">
          <div className="pt-button-group pt-fill">
            {products.length > 0 && (
              <button className="pt-button pt-icon-arrow-left">
                Prev Page
              </button>
            )}
            {products.length === 9 && (
              <button className="pt-button pt-icon-arrow-right">
                Next Page
              </button>
            )}
          </div>
        </Grid>
      </div>
    );
  }
}
