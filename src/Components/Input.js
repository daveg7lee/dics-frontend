import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.input`
  width: 100%;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 2rem;
  font-size: 12px;
  padding: 0px 10px;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = 'text',
  className,
  onKeyPress,
  min,
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    type={type}
    min={min}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  type: PropTypes.string,
};

export default Input;
