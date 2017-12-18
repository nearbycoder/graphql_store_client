import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Product, Loading } from '../../components';
import { productFragment } from '../../fragments';

class ProductShow extends Component {
  render() {
    const { loading, product } = this.props;
    if (loading) return <Loading />;
    return <Product product={product} />;
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
