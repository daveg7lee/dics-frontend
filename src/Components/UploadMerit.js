/* eslint-disable import/no-anonymous-default-export */
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Button from '../Components/Button';
import useInput from '../Hooks/useInput';

const UPLOAD_SCORE = gql`
  mutation UploadScore(
    $score: Int!
    $article: String!
    $username: String!
    $type: String!
    $date: String!
    $uploader: String!
  ) {
    UploadScore(
      score: $score
      article: $article
      username: $username
      type: $type
      date: $date
      uploader: $uploader
    )
  }
`;

const SEARCH_USER_AND_ME = gql`
  query searchUserAndMe($term: String!) {
    searchUser(term: $term) {
      id
      username
      avatar
      type
      scores {
        score
        article
        date
        type
        uploader
      }
    }
    me {
      username
      avatar
      type
      email
      scores {
        score
        article
        date
        type
        uploader
      }
    }
  }
`;

export default () => {
  const uploader = useInput('');
  const term = useInput('');
  const reason = useInput('');
  const score = useInput('');
  let date = useInput('');
  const [username, setUsername] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [UploadScoreMutation] = useMutation(UPLOAD_SCORE);
  const { data, loading, refetch } = useQuery(SEARCH_USER_AND_ME, {
    variables: { term: term.value },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loading) {
        if (data.me.type !== 'Admin') {
          throw Error("You Can't");
        }
      }
      setLoadingBtn(true);
      try {
        const {
          data: { UploadScore },
        } = await UploadScoreMutation({
          variables: {
            score: +score.value,
            article: reason.value,
            username,
            type: 'Merit',
            date: date.value,
            uploader: uploader.value,
          },
        });
        if (UploadScore) {
          toast.success('입력이 완료되었습니다!');
          window.setTimeout(() => window.location.reload(), 3000);
        }
      } catch (e) {
        const errorMessage = e.message
          .replace('GraphQL', '')
          .replace('error', '')
          .replace(':', '');
        toast.error(errorMessage);
      } finally {
        setLoadingBtn(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (date.value === '') {
      const offset = new Date().getTimezoneOffset() * 60000;
      date.setValue(new Date(Date.now() - offset).toISOString().substr(0, 16));
    }
  });
  return (
    <div className="container">
      <h1 className="title">상점 입력</h1>
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="입력자"
            value={uploader.value}
            onChange={uploader.onChange}
          />
          <input
            className="input"
            placeholder="Date"
            type="datetime-local"
            value={date.value}
            onChange={date.onChange}
          />
          <input
            className="input"
            placeholder="받는사람"
            value={term.value}
            onChange={term.onChange}
            onKeyPress={() => refetch()}
          />
          {data?.searchUser?.length !== 0 && (
            <div className="labelContainer">
              {loading ? (
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={20}
                  width={20}
                  timeout={5000}
                />
              ) : (
                <>
                  {data.searchUser.length !== 0
                    ? data.searchUser.map((user) => (
                        <label className="label" key={user.id}>
                          <input
                            key={user.id}
                            type="radio"
                            name="Student"
                            value={user.username}
                            style={{ width: '1rem' }}
                            onClick={() => setUsername(user.username)}
                          />
                          {user.username}
                        </label>
                      ))
                    : term.value !== '' && <h1>User not Found</h1>}
                </>
              )}
            </div>
          )}
          <input
            className="input"
            placeholder="사유"
            value={reason.value}
            onChange={reason.onChange}
          />
          <input
            className="input"
            placeholder="점수"
            type="number"
            value={score.value}
            onChange={score.onChange}
          />
          {loadingBtn ? (
            <Button
              text={
                <Loader
                  type="TailSpin"
                  color="white"
                  height={16}
                  width={16}
                  timeout={5000}
                />
              }
            />
          ) : (
            <Button text="Submit" />
          )}
        </form>
      </div>
    </div>
  );
};
