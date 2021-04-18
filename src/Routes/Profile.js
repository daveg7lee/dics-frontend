/* eslint-disable array-callback-return */
import React from 'react';
import styled from 'styled-components';
import Loading from '../Components/Loading';
import ProfileBox from '../Components/ProfileBox';
import CustomPopup from '../Components/CustomPopup';
import Button from '../Components/Button';
import { logUserOut } from '../apollo';
import Table from '../Components/Table';
import useUser from '../Hooks/useUser';

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScoreContainer = styled.div`
  height: fit-content;
  width: 80%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -5px 25px -5px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  @media (max-width: 760px) {
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

const ScoreBox = styled.div`
  padding: 3rem;
  @media (max-width: 760px) {
    padding: 1.5rem;
  }
`;

const WarningBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Score = styled.span`
  font-size: 4rem;
  font-weight: 500;
`;

const Warning = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  @media (max-width: 760px) {
    font-size: 1.5rem;
  }
  @media (max-width: 320px) {
    font-size: 1.3rem;
  }
`;

const LogOutContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0px;
  @media (max-width: 760px) {
    width: 100%;
  }
`;

const Bold = styled.h1`
  width: 80%;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 1rem 0px;
  text-align: left;
`;

const Profile = () => {
  const { data, loading } = useUser();
  const onClick = async (e) => {
    e.preventDefault();
    logUserOut();
  };
  let sum = 0;
  if (!loading) {
    data.me.scores.map((score) => {
      if (score.type === 'Demerit') {
        sum += score.score * -1;
      } else {
        sum += score.score;
      }
    });
  }
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Bold>Profile</Bold>
          <ProfileBox
            avatar={data.me.avatar}
            username={data.me.username}
            me={true}
          />
          <Bold>Demerit</Bold>
          <ScoreContainer>
            <ScoreBox>
              <Score>{sum}</Score>
            </ScoreBox>
            <WarningBox>
              <Warning>
                {sum <= -15
                  ? 'Go to Solomon'
                  : sum <= -10
                  ? 'You are Warning'
                  : 'You are Safe'}
              </Warning>
              <CustomPopup
                contents={
                  <>
                    {data.me.scores.length >= 1 ? (
                      <Table scores={data.me.scores} />
                    ) : (
                      <h1>Nothing Here</h1>
                    )}
                  </>
                }
              />
            </WarningBox>
          </ScoreContainer>
          <LogOutContainer>
            <Button onClick={onClick} text={'Log Out'} width={'5rem'} />
          </LogOutContainer>
        </>
      )}
    </Container>
  );
};

export default Profile;
