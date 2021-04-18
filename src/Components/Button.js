import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 100%;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-size: 15px;
  font-weight: 500;
  background-color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 0.7;
  }
`;

const Button = ({ text, onClick, width }) => {
  return (
    <Container onClick={onClick} style={{ width }}>
      {text}
    </Container>
  );
};

export default Button;
