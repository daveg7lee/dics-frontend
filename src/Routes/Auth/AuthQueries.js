import { gql } from 'apollo-boost';

export const LOG_USER_IN = gql`
  mutation LogUserIn($username: String!, $password: String!) {
    LogUserIn(username: $username, password: $password)
  }
`;
