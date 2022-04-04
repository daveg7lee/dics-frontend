/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loading from '../Components/Loading';
import SearchTable from '../Components/SearchTable';
import useUser from '../Hooks/useUser';
import { useHistory } from "react-router-dom";

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid black;
  margin-top: 1rem;
`;

const SEE_USERS = gql`
  query {
    seeUsers {
      id
      username
      avatar
      type
      totalScores
      totalMerit
      scores {
        id
        score
        article
        date
        type
        uploader
        detail
      }
    }
  }
`;

const DELETE_SCORE = gql`
  mutation deleteScore($id: ID!) {
    deleteScore(id: $id)
  }
`;

export default () => {
  const { data, loading, refetch } = useQuery(SEE_USERS);
  const [deleteScoreMutation] = useMutation(DELETE_SCORE);
  const {user, userLoading} = useUser();
  const history = useHistory();

  if(!userLoading) {
    if(user?.me?.type !== "Admin") {
      history.push("/")
    }
  }

  const deleteScore = async (e) => {
    e.preventDefault();
    try {
      const id = e.target.id;
      const { data: deleteScore } = await deleteScoreMutation({
        variables: { id },
      });
      if (deleteScore) {
        toast.success('Deleted');
        refetch();
      }
    } catch (e) {
      const errorMessage = e.message
        .replace('GraphQL', '')
        .replace('error', '')
        .replace(':', '');
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <ul className="mb-20">
          <div className="mb-40">
            <Title>솔로몬 고위험자</Title>
            {data.seeUsers.map((user) => {
              if (user.totalScores <= -15) {
                return (
                  <SearchTable
                    user={user}
                    totalScore={user.totalScores}
                    totalMerit={user.totalMerit}
                    deleteScore={deleteScore}
                  />
                );
              }
            })}
          </div>
          <div>
            <Title>전체 보기</Title>
            {data.seeUsers.map((user) => {
              if (user.username !== 'Admin') {
                return (
                  <SearchTable
                    user={user}
                    totalScore={user.totalScores}
                    totalMerit={user.totalMerit}
                    deleteScore={deleteScore}
                  />
                );
              }
            })}
          </div>
        </ul>
      )}
    </div>
  );
};
