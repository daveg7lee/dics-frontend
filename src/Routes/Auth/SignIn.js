/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../Components/Button';
import useInput from '../../Hooks/useInput';
import { Helmet } from 'react-helmet';
import { logUserIn } from '../../apollo';

const Container = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  line-height: 2.3rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 1rem 1.5rem;
  width: 80%;
  @media (min-width: 1024px) {
    width: 30%;
  }
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

const LOG_USER_IN = gql`
  mutation LogUserIn($username: String!, $password: String!) {
    LogUserIn(username: $username, password: $password)
  }
`;

export default withRouter(({ history }) => {
  const [loading, setLoading] = useState(false);
  const username = useInput('');
  const password = useInput('');
  const [logUserInMutation] = useMutation(LOG_USER_IN, {
    variables: {
      username: username.value,
      password: password.value,
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username.value !== '') {
      try {
        const {
          data: { LogUserIn: token },
        } = await logUserInMutation();
        if (token !== '' && token !== undefined) {
          logUserIn(token);
          history.push('/');
          window.location.reload();
        } else {
          throw Error();
        }
      } catch (e) {
        setLoading(false);
        const errorMessage = e.message
          .replace('GraphQL', '')
          .replace('error', '')
          .replace(':', '');
        toast.error(errorMessage);
      }
    } else {
      toast.error("Username Can't Empty");
    }
  };
  return (
    <Container>
      <Helmet>
        <title>Log In | DICS 벌점 체크 시스템</title>
        <meta name="description" content="로그인" />
      </Helmet>
      <Title>DICS</Title>
      <Form>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Username"
            value={username.value}
            onChange={username.onChange}
            className="input"
          />
          <input
            placeholder="Password"
            value={password.value}
            onChange={password.onChange}
            type="password"
            className="input"
          />
          {loading ? (
            <Button
              text={
                <Loader
                  type="TailSpin"
                  color="white"
                  height={16}
                  width={16}
                  timeout={500000}
                />
              }
            />
          ) : (
            <Button text="Sign In" width="100%" />
          )}
        </form>
      </Form>
    </Container>
  );
});
