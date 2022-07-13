import gql from "graphql-tag";

export const SEARCH_USER = gql`
  query searchUser($term: String!) {
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
  }
`;

export const SEARCH_USER_AND_ME = gql`
  query searchUserAndMe($username: String) {
    searchUser(username: $username) {
      success
      users {
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
