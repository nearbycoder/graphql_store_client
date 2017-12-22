import React, { Component } from 'react';
import { Grid } from 'styled-css-grid';
import { ProductListItem, Pagination } from './';

export default class ProductList extends Component {
  render() {
    const { products, offset, prevPage, nextPage, user } = this.props;
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
            <ProductListItem key={product.id} product={product} user={user} />
          ))}
        </Grid>
        <Pagination
          productsLength={products.length}
          nextPage={nextPage}
          prevPage={prevPage}
          offset={offset}
        />
        <Grid
          style={{
            maxWidth: '860px',
            margin: '0px auto 30px',
            padding: '0 20px'
          }}
          columns="1">
          {products.length === 0 && (
            <p style={{ textAlign: 'center' }}>No Products Found.</p>
          )}
        </Grid>
      </div>
    );
  }
}
