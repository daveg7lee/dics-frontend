import Link from "next/link";
import styled from "styled-components";

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

const ProfileBox = ({ avatar, username, me }) => (
  <div className="h-fit md:w-4/5 w-full rounded-2xl grid grid-cols-2 shadow-lg p-4">
    <AvatarContainer>
      <Avatar src={avatar} />
    </AvatarContainer>
    <NameContainer>
      <NameBox>
        <Label>Name</Label>
        <Name>{username}</Name>
      </NameBox>
      {me && (
        <Link href={`/edit`}>
          <a>
            <button className="blueButton">Edit Profile</button>
          </a>
        </Link>
      )}
    </NameContainer>
  </div>
);

export default ProfileBox;
