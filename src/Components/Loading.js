/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const LoadingBox = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <LoadingBox>
    <Loader
      type="TailSpin"
      color="#00BFFF"
      height={50}
      width={50}
      timeout={5000}
    />
  </LoadingBox>
);
