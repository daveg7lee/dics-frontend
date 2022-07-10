import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import SearchTable from "../components/searchUser/SearchTable";

const SEE_USERS = gql`
  query {
    seeUsers {
      users {
        id
        username
        avatar
        type
        totalScores
        totalMerit
        scores {
          id
          score
          article
          date
          type
          uploader
          detail
        }
      }
    }
  }
`;

const DELETE_SCORE = gql`
  mutation deleteScore($id: String!) {
    deleteScore(id: $id) {
      success
      error
    }
  }
`;

const SearchUser = () => {
  const { data, loading, refetch } = useQuery(SEE_USERS);
  const [deleteScoreMutation] = useMutation(DELETE_SCORE);

  const deleteScore = async (e) => {
    e.preventDefault();
    try {
      const id = e.target.id;
      const { data: deleteScore } = await deleteScoreMutation({
        variables: { id },
      });
      if (deleteScore) {
        toast.success("Deleted");
        refetch();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {loading ? (
        <Loading />
      ) : (
        <ul className="mb-20">
          <div className="mb-40 px-10">
            <h1 className="text-2xl font-semibold p-4 border-b border-black mt-4">
              솔로몬 고위험자
            </h1>
            {data.seeUsers.users.map((user) => {
              if (user.totalScores <= -15) {
                return (
                  <SearchTable
                    user={user}
                    totalScore={user.totalScores}
                    totalMerit={user.totalMerit}
                    deleteScore={deleteScore}
                  />
                );
              }
            })}
          </div>
          <div className="px-10">
            <h1 className="text-2xl font-semibold p-4 border-b border-black mt-4">
              전체 보기
            </h1>
            {data.seeUsers.users.map((user) => (
              <SearchTable
                user={user}
                totalScore={user.totalScores}
                totalMerit={user.totalMerit}
                deleteScore={deleteScore}
              />
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
