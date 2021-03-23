/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loading from "../Components/Loading";
import ProfileBox from "../Components/ProfileBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const SEE_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      username
      avatar
    }
  }
`;

export default () => {
  const username = decodeURI(window.location.href.split("/")[5]);
  const { data, loading } = useQuery(SEE_USER, { variables: { username } });
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <ProfileBox
          avatar={data.seeUser.avatar}
          username={data.seeUser.username}
          me={false}
        />
      )}
    </Container>
  );
};
