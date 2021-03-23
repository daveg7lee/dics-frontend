import { gql } from "apollo-boost";

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $bio: String
    $password: String!
    $type: String!
  ) {
    createAccount(
      username: $username
      email: $email
      bio: $bio
      password: $password
      type: $type
    )
  }
`;

export const LOG_USER_IN = gql`
  mutation LogUserIn($username: String!, $password: String!) {
    LogUserIn(username: $username, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logIn($token: String!) {
    logIn(token: $token) @client
  }
`;
