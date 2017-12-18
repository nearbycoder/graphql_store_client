import gql from 'graphql-tag';

export default gql`
  fragment productFragment on Product {
    id
    name
    description
    imageUrl
    variants {
      id
      name
      description
      price
    }
  }
`;
