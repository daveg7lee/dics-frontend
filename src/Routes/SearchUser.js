/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loading from '../Components/Loading';
import SearchTable from '../Components/SearchTable';
import useInput from '../Hooks/useInput';

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid black;
  margin-top: 1rem;
`;

const SEE_AND_SEARCH_USERS = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      id
      username
      avatar
      type
      totalScores
      scores {
        id
        score
        article
        date
        type
        uploader
      }
    }
    seeUsers {
      id
      username
      avatar
      type
      totalScores
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
  const term = useInput('');
  const { data, loading, refetch } = useQuery(SEE_AND_SEARCH_USERS, {
    variables: { term: term.value },
  });
  const [deleteScoreMutation] = useMutation(DELETE_SCORE);
  const onChange = (e) => {
    term.onChange(e);
    e.preventDefault();
    refetch();
  };
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
      <header className="allCenter my-8">
        <input
          placeholder="User Name"
          value={term.value}
          onChange={onChange}
          className="input"
        />
      </header>
      {loading ? (
        <Loading />
      ) : (
        <ul className="mb-20">
          {data.searchUser.length > 0 && (
            <>
              <Title>검색 결과</Title>
              {data.searchUser.map((user) => {
                return (
                  <SearchTable
                    user={user}
                    totalScore={user.totalScores}
                    deleteScore={deleteScore}
                  />
                );
              })}
            </>
          )}
          {data.searchUser.length === 0 && (
            <>
              <div className="mb-40">
                <Title>솔로몬 고위험자</Title>
                {data.seeUsers.map((user) => {
                  if (user.totalScores <= -10) {
                    return (
                      <SearchTable
                        user={user}
                        totalScore={user.totalScores}
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
                        deleteScore={deleteScore}
                      />
                    );
                  }
                })}
              </div>
            </>
          )}
        </ul>
      )}
    </div>
  );
};
