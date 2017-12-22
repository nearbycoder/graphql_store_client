import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Product, Loading } from '../../components';
import { productFragment } from '../../fragments';
import { Link } from 'react-router-dom';
class ProductShow extends Component {
  render() {
    const { loading, product } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        <Link to="/">Back</Link>
        <Product product={product} />
      </div>
    );
  }
}

const getProduct = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
      ...productFragment
    }
  }
  ${productFragment}
`;

export default graphql(getProduct, {
  options(props) {
    return {
      variables: {
        id: props.match.params.id
      },
      fetchPolicy: 'network-only'
    };
  },
  props({ data: { loading, product } }) {
    return {
      loading,
      product
    };
  }
})(ProductShow);
