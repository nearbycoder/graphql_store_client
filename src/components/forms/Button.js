import styled from 'styled-components';
import { lighten } from 'polished';
export default styled.button`
  padding: 8px 20px;
  font-size: 1em;
  color: #ffffff;
  background-color: #3aa0f3;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.05, '#3aa0f3')};
  }
  &:active {
    background-color: ${lighten(0.1, '#3aa0f3')};
  }
  &:disabled {
    background-color: ${lighten(0.3, '#3aa0f3')};
    cursor: not-allowed;
  }
  ${props =>
    props.fr &&
    `
    float: right;
  `};
`;
