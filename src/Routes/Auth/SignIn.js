/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Link, withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import useInput from '../../Hooks/useInput';
import { LOCAL_LOG_IN, LOG_USER_IN } from './AuthQueries';

const Container = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
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

const SignInInput = styled(Input)`
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

export default withRouter(({ history }) => {
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(false);
  const username = useInput('');
  const password = useInput('');
  const [logUserInMutation] = useMutation(LOG_USER_IN, {
    variables: {
      username: username.value,
      password: password.value,
    },
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username.value !== '') {
      try {
        const {
          data: { LogUserIn: token },
        } = await logUserInMutation();
        if (token !== '' && token !== undefined) {
          localLogInMutation({ variables: { token } });
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
        if (e.message.includes('User Not Found')) {
          history.push('/signUp');
        }
      }
    } else {
      toast.error("Username Can't Empty");
    }
  };
  return (
    <Container>
      <Title>
        Sign In to <br />
        DICS
      </Title>
      <Form>
        <form onSubmit={onSubmit}>
          <SignInInput
            placeholder="Username"
            value={username.value}
            onChange={username.onChange}
          />
          <SignInInput
            placeholder="Password"
            value={password.value}
            onChange={password.onChange}
            type="password"
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
      <Link to="/signUp">계정이 없으신가요?</Link>
    </Container>
  );
});
