/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export default () => {
  return <Container></Container>;
};
