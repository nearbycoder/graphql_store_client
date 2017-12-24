import styled from 'styled-components';

export const Card = styled.div`
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  transition: box-shadow 0.3s ease-in-out;
  img {
    border-radius: 2px 2px 0 0;
  }
  &:hover {
    box-shadow: 0 2px 11px rgba(0, 0, 0, 0.3);
  }
  ${props =>
    props.bb &&
    `
    border: 4px solid #43aaf5;
  `};
`;

export const CardBody = styled.div`
  position: relative;
  border-radius: 0 0 2px 2px;
  padding: 20px 20px 20px;
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
`;

export const CardActions = styled.div`
  padding: 10px 0;
  float: right;
`;
