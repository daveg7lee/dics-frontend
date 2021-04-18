/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfileBox = styled.div`
  height: fit-content;
  width: 80%;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -5px 25px -5px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  @media (max-width: 760px) {
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 15rem;
  height: 15rem;
  @media (max-width: 950px) {
    max-width: 10rem;
    height: 10rem;
  }
  @media (max-width: 600px) {
    max-width: 8rem;
    height: 8rem;
  }
  @media (max-width: 450px) {
    max-width: 6.5rem;
    height: 6.5rem;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 760px) {
    justify-content: center;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-bottom: 1rem;
  }
`;

const Name = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const Label = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.5;
`;

export default ({ avatar, username, me }) => (
  <ProfileBox>
    <AvatarContainer>
      <Avatar src={avatar} />
    </AvatarContainer>
    <NameContainer>
      <NameBox>
        <Label>Name</Label>
        <Name>{username}</Name>
      </NameBox>
      {me && (
        <Link to={`/${username}/edit`}>
          <button className="blueButton">Edit Profile</button>
        </Link>
      )}
    </NameContainer>
  </ProfileBox>
);
