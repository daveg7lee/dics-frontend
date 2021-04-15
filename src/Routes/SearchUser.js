/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import { gql } from 'apollo-boost';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../Components/Button';
import CustomPopup from '../Components/CustomPopup';
import Input from '../Components/Input';
import Loading from '../Components/Loading';
import useInput from '../Hooks/useInput';

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0px;
`;

const SearchInput = styled(Input)`
  width: 40%;
`;

const List = styled.ul`
  margin-bottom: 5rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 1.5rem;
`;

const Score = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Username = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  border-radius: 50%;
  justify-self: center;
`;

const Table = styled.table`
  width: 100%;
`;

const Th = styled.th``;

const Td = styled.td`
  text-align: center;
`;

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
      scores {
        id
        score
        article
        date
        type
        uploader
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
      const id = e.target.parentNode.id;
      const { data: deleteScore } = await deleteScoreMutation({
        variables: { id },
      });
      if (deleteScore) {
        window.location.reload();
        toast.success('Deleted');
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
    <Container>
      <Header>
        <SearchInput
          placeholder="User Name"
          value={term.value}
          onChange={onChange}
        />
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <List>
          {data.searchUser.length > 0 && <Title>검색 결과</Title>}
          {data.searchUser.length > 0 &&
            data.searchUser.map((user) => {
              let sum = 0;
              return (
                <Item key={user.id}>
                  <Avatar src={user.avatar} />
                  <Username>{user.username}</Username>
                  <Score>
                    {user.scores.length > 0 &&
                      user.scores.map((score) => {
                        score.type === 'Demerit'
                          ? (sum -= score.score)
                          : (sum += score.score);
                      })}
                    {user.scores.length > 0 ? sum : 0}
                  </Score>
                  <CustomPopup
                    trigger={<Button text="Show" />}
                    contents={
                      <>
                        {user.scores.length > 0 ? (
                          <Table>
                            <thead>
                              <tr>
                                <Th>Score</Th>
                                <Th>Article</Th>
                                <Th>Date</Th>
                                <Th>Uploader</Th>
                              </tr>
                            </thead>
                            {user.scores.map((score) => (
                              <tr
                                key={score.id}
                                style={{ marginTop: '0.5rem' }}
                                id={score.id}
                              >
                                <Td>
                                  {score.type === 'Demerit'
                                    ? score.score * -1
                                    : score.score}
                                </Td>
                                <Td>{score.article}</Td>
                                <Td>
                                  {score.date
                                    .replace(/T.*/, '')
                                    .split('-')
                                    .join('-')}
                                </Td>
                                <Td>{score.uploader}</Td>
                                <Button text="Delete" onClick={deleteScore} />
                              </tr>
                            ))}
                          </Table>
                        ) : (
                          <h1>Nothing Here</h1>
                        )}
                      </>
                    }
                  />
                </Item>
              );
            })}
          {data.searchUser.length === 0 && (
            <>
              <Title>솔로몬 고위험자들</Title>
              {data.seeUsers.map((user) => {
                let totalScore = 0;
                user.scores.map((score) => {
                  score.type === 'Demerit'
                    ? (totalScore += score.score * -1)
                    : (totalScore += score.score);
                });
                if (totalScore <= -10) {
                  return (
                    <Item key={user.id}>
                      <Avatar src={user.avatar} />
                      <Username>{user.username}</Username>
                      <Score>{totalScore}</Score>
                      <CustomPopup
                        trigger={<Button text="Show List" />}
                        contents={
                          <>
                            {user.scores.length >= 1 ? (
                              <Table>
                                <thead>
                                  <tr>
                                    <Th>Score</Th>
                                    <Th>Article</Th>
                                    <Th>Date</Th>
                                    <Th>Uploader</Th>
                                  </tr>
                                </thead>
                                {user.scores.map((score) => (
                                  <tr
                                    key={score.id}
                                    style={{ marginTop: '0.5rem' }}
                                    id={score.id}
                                  >
                                    <Td>
                                      {score.type === 'Demerit'
                                        ? score.score * -1
                                        : score.score}
                                    </Td>
                                    <Td>{score.article}</Td>
                                    <Td>
                                      {score.date
                                        .replace(/T.*/, '')
                                        .split('-')
                                        .join('-')}
                                    </Td>
                                    <Td>{score.uploader}</Td>
                                    <Button
                                      text="Delete"
                                      onClick={deleteScore}
                                    />
                                  </tr>
                                ))}
                              </Table>
                            ) : (
                              <h1>Nothing Here</h1>
                            )}
                          </>
                        }
                      />
                    </Item>
                  );
                }
              })}
            </>
          )}
        </List>
      )}
    </Container>
  );
};
