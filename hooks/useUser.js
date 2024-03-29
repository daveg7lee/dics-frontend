import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME = gql`
  {
    me {
      username
      avatar
      grade
      type
      email
      totalScores
      totalMerit
      fullScores
      fullMerit
      scores {
        score
        article
        date
        type
        uploader
        detail
      }
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery(ME, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data, loading };
};

export default useUser;
