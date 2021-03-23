/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import Slider from "infinite-react-carousel";

const Container = styled.div`
  min-height: 100vh;
  margin-top: 5rem;
  border-radius: 5px;
`;

const Body = styled.div`
  padding: 1rem;
  height: 100%;
  @media (max-width: 768px) {
    padding: 0;
    width: 100vw;
    position: absolute;
    left: 0;
  }
`;

const Header = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  @media (min-width: 1024px) {
    padding-left: 1rem;
    display: block;
  }
`;

const Nothing = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 75%;
  border-radius: 5px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -5px 25px -5px rgba(0, 0, 0, 0.04);
  @media (max-width: 760px) {
    width: 100vw;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0px;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
`;

const User = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  margin-right: 0.5rem;
`;

const SEE_POST = gql`
  query seePost($id: String!) {
    seePost(id: $id) {
      id
      title
      description
      files {
        id
        url
      }
      user {
        username
        avatar
      }
    }
  }
`;

export default () => {
  window.scrollTo(0, 0);
  const id = window.location.href.split("/")[5];
  const { data, loading } = useQuery(SEE_POST, { variables: { id } });
  const settings = {
    adaptiveHeight: true,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    duration: 100,
    arrowsBlock: false,
  };
  return (
    <Container>
      {loading ? (
        <>
          <Header>
            <Title>
              <Skeleton width={"10rem"} height={"2rem"} />
            </Title>
            <SubTitle>
              <Skeleton width={"10rem"} height={"1.5rem"} />
            </SubTitle>
            <User>
              <Skeleton
                circle={true}
                width={"40px"}
                height={"40px"}
                style={{ marginRight: ".5rem" }}
              />
              <Skeleton width={"5rem"} height={"1.5rem"} />
            </User>
          </Header>
          <Body>
            <Skeleton height={"80vh"} />
          </Body>
        </>
      ) : (
        <>
          <Header>
            {data.seePost && (
              <>
                <Title>{data.seePost.title}</Title>
                <SubTitle>{data.seePost.description}</SubTitle>
                <User>
                  <Avatar
                    src={data.seePost.user.avatar}
                    alt={data.seePost.user.username}
                  />
                  <SubTitle>{data.seePost.user.username}</SubTitle>
                </User>
              </>
            )}
          </Header>
          <Body>
            <Slider {...settings}>
              {data.seePost &&
                data.seePost.files.map((file) => (
                  <ImageContainer key={file.id}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Image src={file.url} alt="Not Found" />
                    </div>
                  </ImageContainer>
                ))}
            </Slider>
            {!data.seePost && <Nothing>404 Not Found</Nothing>}
          </Body>
        </>
      )}
    </Container>
  );
};
