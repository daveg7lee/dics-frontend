/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../Components/Button";
import Input from "../Components/Input";
import useInput from "../Hooks/useInput";

const Container = styled.div`
  margin: 5rem 0px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  max-width: 60vw;
  margin-bottom: 2rem;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const MeritInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 8px 5px;
  font-size: 14px;
  border-radius: 5px;
  height: auto;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const LabelContainer = styled.div`
  width: 100%;
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
`;

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
  const uploader = useInput("");
  const term = useInput("");
  const reason = useInput("");
  const score = useInput("");
  let date = useInput("");
  const [username, setUsername] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [UploadScoreMutation] = useMutation(UPLOAD_SCORE);
  const { data, loading, refetch } = useQuery(SEARCH_USER_AND_ME, {
    variables: { term: term.value },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loading) {
        if (data.me.type !== "Admin") {
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
            type: "Merit",
            date: date.value,
            uploader: uploader.value,
          },
        });
        if (UploadScore) {
          toast.success("입력이 완료되었습니다!");
          window.setTimeout(() => window.location.reload(), 3000);
        }
      } catch (e) {
        const errorMessage = e.message
          .replace("GraphQL", "")
          .replace("error", "")
          .replace(":", "");
        toast.error(errorMessage);
      } finally {
        setLoadingBtn(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (date.value === "") {
      const offset = new Date().getTimezoneOffset() * 60000;
      date.setValue(new Date(Date.now() - offset).toISOString().substr(0, 16));
    }
  });
  return (
    <Container>
      <Title>상점 입력</Title>
      <Form>
        <form onSubmit={onSubmit}>
          <MeritInput
            placeholder="입력자"
            value={uploader.value}
            onChange={uploader.onChange}
          />
          <MeritInput
            placeholder="Date"
            type="datetime-local"
            value={date.value}
            onChange={date.onChange}
          />
          <MeritInput
            placeholder="받는사람"
            value={term.value}
            onChange={term.onChange}
            onKeyPress={() => refetch()}
          />
          <LabelContainer>
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
                      <Label key={user.id}>
                        <input
                          key={user.id}
                          type="radio"
                          name="Student"
                          value={user.username}
                          style={{ width: "1rem" }}
                          onClick={() => setUsername(user.username)}
                        />
                        {user.username}
                      </Label>
                    ))
                  : term.value !== "" && <h1>User not Found</h1>}
              </>
            )}
          </LabelContainer>
          <MeritInput
            placeholder="사유"
            value={reason.value}
            onChange={reason.onChange}
          />
          <MeritInput
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
      </Form>
    </Container>
  );
};
