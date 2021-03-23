/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import React, { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Skeleton from "react-loading-skeleton";

const Container = styled.div`
  margin-bottom: 40vh;
  min-height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => props.theme.lightGreyColor};
`;

const PhotoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  justify-self: center;
  width: 22rem;
  height: fit-content;
  padding-top: 1rem;
  position: relative;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const ImageLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 18rem;
  gap: 1rem;
`;

const Hover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(200%) blur(5px);
  color: black;
  font-size: 3rem;
  font-weight: 500;
  &:hover {
    visibility: visible;
  }
`;

const SEE_PHOTO = gql`
  {
    seePosts {
      id
      title
      description
      files {
        id
        url
      }
    }
  }
`;

export default () => {
  useEffect(() => window.scrollTo(0, 0));
  const { data, loading } = useQuery(SEE_PHOTO);
  if (!loading) {
    data.seePosts.reverse();
    console.log(data.seePosts);
  }
  return (
    <Container>
      <Header>
        <Title>Gallary</Title>
        <SubTitle>The History of DICS</SubTitle>
      </Header>
      {loading ? (
        <LoadingContainer>
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
          <Skeleton width={"100%"} height={"100%"} />
        </LoadingContainer>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 650: 2, 900: 3 }}>
          <Masonry gutter="1rem">
            {data &&
              data.seePosts.map((post) => (
                <ImageLink key={post.id} to={`/gallary/${post.id}`}>
                  <PhotoBox>
                    <Hover>{post.title}</Hover>
                    <Photo src={post.files[0].url} alt="Error" />
                  </PhotoBox>
                </ImageLink>
              ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Container>
  );
};
