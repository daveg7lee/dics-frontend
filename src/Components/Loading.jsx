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
    <Loader type="Oval" color="#969696" height={30} width={30} />
  </LoadingBox>
);
