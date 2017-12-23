import { Link as RouteLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const LinkWrapper = styled(RouteLink)`
  margin: 0 10px;
  text-decoration: none;
  cursor: pointer;
  color: #4b4e50;
  display: inline-block;
  ${props =>
    props.bl === 'true' &&
    `
    display: block;
  `};
  ${props =>
    props.m &&
    `
    margin: ${props.m};
  `};
`;

export const Link = ({ bl, ...props }) => (
  <LinkWrapper bl={bl ? 'true' : 'false'} {...props}>
    {props.children}
  </LinkWrapper>
);

export const ActionLink = props => <Link>{props.children}</Link>;
