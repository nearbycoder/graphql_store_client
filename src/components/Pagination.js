import React, { Component } from 'react';
import { Grid } from 'styled-css-grid';

export default class Pagination extends Component {
  render() {
    const { offset, prevPage, nextPage, productsLength } = this.props;
    return (
      <Grid
        style={{
          maxWidth: '860px',
          margin: '0px auto 30px',
          padding: '0 20px'
        }}
        columns="1">
        <div>
          {productsLength > 0 &&
            offset !== 0 && <button onClick={prevPage}>Prev Page</button>}
          {productsLength === 9 && (
            <button onClick={nextPage}>Next Page</button>
          )}
        </div>
      </Grid>
    );
  }
}
