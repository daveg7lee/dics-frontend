import gql from 'graphql-tag';

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
