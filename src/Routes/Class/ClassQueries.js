import { gql } from "apollo-boost";

export const SEE_CLASS_AND_ME = gql`
  query seeClass($id: ID!) {
    seeClass(id: $id) {
      name
      key
      color
      teacher {
        id
        username
        avatar
      }
      students {
        username
        avatar
      }
      homeworks {
        id
        title
        description
        deadline
      }
    }
    me {
      id
      type
    }
  }
`;
