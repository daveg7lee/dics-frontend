import styled from "styled-components";
import Loading from "./Loading";
import ProfileBox from "./ProfileBox";
import CustomPopup from "./CustomPopup";
import CustomButton from "./CustomButton";
import { logUserOut } from "../apollo";
import Table from "./Table";
import useUser from "../Hooks/useUser";
import Head from "next/head";

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

const Score = styled.span`
  font-size: 4rem;
  font-weight: 500;
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
  let sum = 0;
  return (
    <div className="container">
      <Head>
        <title>Profile | DICS 벌점 체크 시스템</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Bold>Profile</Bold>
          <ProfileBox
            avatar={data?.me?.avatar}
            username={data?.me?.username}
            me={true}
          />
          <Bold>Demerit</Bold>
          <ScoreContainer>
            <div className=" w-1/3 flex justify-around items-center">
              <div className="flex flex-col justify-center items-center">
                <Score>{data?.me?.totalScores}</Score>
                <p className="text-xl font-medium">벌점</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Score>{data?.me?.totalMerit}</Score>
                <p className="text-xl font-medium">상점</p>
              </div>
            </div>
            <div className="w-2/3 flex justify-center items-center">
              <h1 className="mr-5 text-2xl font-semibold">
                {sum <= -15
                  ? "Go to Solomon"
                  : sum <= -10
                  ? "You are Warning"
                  : "You are Safe"}
              </h1>
              <CustomPopup
                contents={
                  <>
                    {data?.me?.scores.length >= 1 ? (
                      <Table scores={data?.me?.scores} />
                    ) : (
                      <h1>Nothing Here</h1>
                    )}
                  </>
                }
              />
            </div>
          </ScoreContainer>
          <LogOutContainer>
            <CustomButton
              onClick={() => logUserOut()}
              text={"Log Out"}
              width={"5rem"}
            />
          </LogOutContainer>
        </>
      )}
    </div>
  );
};

export default Profile;
