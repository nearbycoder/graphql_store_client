import styled from 'styled-components';
import React from 'react';
import { Link } from '../';

export const LogoWrapper = styled.div`
  font-size: 28px;
  color: #43aaf5;
  padding: 10px 0;
  text-align: center;
  font-family: 'Bungee';
  ${props =>
    props.left &&
    `
    text-align: left;
  `};
`;

export const Logo = props => (
  <Link bl to="/">
    <LogoWrapper {...props}>{props.children || 'Graphql Store'}</LogoWrapper>
  </Link>
);
