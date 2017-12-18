import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProductList, Loading } from '../../components';
import { productFragment } from '../../fragments';
import { connect } from 'redux-zero/react';
import actions from '../../actions';

class ProductHome extends Component {
  defaultState = {
    offset: 0,
    limit: 9
  };
  state = this.defaultState;

  nextPage = () => {
    this.setState(
      () => ({ offset: this.state.offset + this.state.limit }),
      () => {
        this.props.loadMoreEntries(
          this.props.search,
          this.state.limit,
          this.state.offset
        );
      }
    );
  };

  prevPage = () => {
    this.setState(
      () => ({ offset: this.state.offset - this.state.limit }),
      () =>
        this.props.loadMoreEntries(
          this.props.search,
          this.state.limit,
          this.state.offset
        )
    );
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.search !== nextProps.search) {
      this.setState(this.defaultState);
      this.props.loadMoreEntries(nextProps.search);
    }
  };

  render() {
    const { loading, products, user } = this.props;
    if (loading) return <Loading />;
    return (
      <ProductList
        prevPage={this.prevPage}
        nextPage={this.nextPage}
        products={products}
        offset={this.state.offset}
        user={user}
      />
    );
  }
}

const getProducts = gql`
  query getProducts($search: String, $limit: Int, $offset: Int) {
    products(name: $search, limit: $limit, offset: $offset) {
      ...productFragment
    }
  }
  ${productFragment}
`;

const mapToProps = ({ search }) => ({ search });
export default connect(mapToProps, actions)(
  graphql(getProducts, {
    options(props) {
      return {
        variables: {
          offset: 0,
          limit: 9
        },
        fetchPolicy: 'network-only'
      };
    },
    props({ data, data: { loading, products, fetchMore } }) {
      return {
        loading,
        products,
        loadMoreEntries(search, limit, offset) {
          return fetchMore({
            variables: {
              search: search,
              limit: limit || 9,
              offset: offset || 0
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              return fetchMoreResult;
            }
          });
        }
      };
    }
  })(ProductHome)
);
