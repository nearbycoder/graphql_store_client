import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { composeValidators } from '../../lib';
import styled from 'styled-components';

const InputWrapper = styled.div`
  padding: 5px 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 1em;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
  &::placeholder {
    color: #cedbe6;
    font-weight: 100;
  }
`;

const Label = styled.label`
  display: inline-block;
  padding: 5px 0;
  color: #757677;
`;

const Error = styled.span`
  color: #ff5f60;
  padding: 0 5px;
`;

export default class Input extends Component {
  render() {
    const {
      label,
      validators,
      name,
      component,
      placeholder,
      type
    } = this.props;
    return (
      <Field
        validate={composeValidators(...validators)}
        name={name}
        component={component}>
        {({ input, meta }) => {
          return (
            <InputWrapper>
              <Label>{label} </Label>
              {meta.error && meta.touched && <Error>*{meta.error}</Error>}
              <StyledInput {...input} type={type} placeholder={placeholder} />
            </InputWrapper>
          );
        }}
      </Field>
    );
  }
}
