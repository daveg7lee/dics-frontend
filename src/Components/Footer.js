/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.footer`
  background-color: #5d7b8e;
  margin-top: 5rem;
`;

const Copyright = styled.span`
  color: #bdbdbd;
  font-size: 1.5rem;
  font-weight: 600;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

const RoutesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 0.5rem;
  gap: 0.5rem;
  @media (min-width: 1024px) {
    grid-gap: 2rem;
    gap: 2rem;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 3.75rem;
  gap: 3.75rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-column: span 2 / span 2;
  }
`;

const RouteContainer = styled.div``;

const Title = styled.h1`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const List = styled.ul`
  margin-top: 1rem;
`;

const Item = styled.li`
  margin-top: 1rem;
`;

const Route = styled(Link)`
  font-size: 1rem;
  line-height: 1.5rem;
  color: #bdbdbd;
`;

const AddressContainer = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #bdbdbd;
  padding-top: 2rem;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Address = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #bdbdbd;
  @media (min-width: 768px) {
    margin-top: 0;
    order: 1;
  }
`;

export default withRouter(({ isLoggedIn }) => {
  return (
    <Footer>
      <Container>
        <Grid>
          <Copyright>DICS {new Date().getFullYear()} &copy;</Copyright>
          {isLoggedIn ? (
            <RoutesContainer>
              <RouteContainer>
                <Title>Gallary</Title>
                <List>
                  <Item>
                    <Route to="about">Photo</Route>
                  </Item>
                  <Item>
                    <Route to="about">Video</Route>
                  </Item>
                </List>
              </RouteContainer>
              <RouteContainer>
                <Title>Class</Title>
                <List>
                  <Item>
                    <Route to="about">My Class</Route>
                  </Item>
                </List>
              </RouteContainer>
              <RouteContainer>
                <Title>Community</Title>
                <List>
                  <Item>
                    <Route to="about">School News</Route>
                  </Item>
                  <Item>
                    <Route to="about">Parent's Voice</Route>
                  </Item>
                </List>
              </RouteContainer>
            </RoutesContainer>
          ) : (
            <RoutesContainer
              style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
            >
              <RouteContainer>
                <Title>Gallary</Title>
                <List>
                  <Item>
                    <Route to="about">Photo</Route>
                  </Item>
                  <Item>
                    <Route to="about">Video</Route>
                  </Item>
                </List>
              </RouteContainer>
              <RouteContainer>
                <Title>Community</Title>
                <List>
                  <Item>
                    <Route to="about">School News</Route>
                  </Item>
                  <Item>
                    <Route to="about">Parent's Voice</Route>
                  </Item>
                </List>
              </RouteContainer>
            </RoutesContainer>
          )}
        </Grid>
        <AddressContainer>
          <Address>
            TEL. 053.812.1855 | FAX. 053.812.1856
            <br /> 경상북도 경산시 원효로 454 제자국제크리스천스쿨
          </Address>
        </AddressContainer>
      </Container>
    </Footer>
  );
});
