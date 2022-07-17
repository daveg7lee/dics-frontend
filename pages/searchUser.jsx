import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { purgeAllScores, purgeAllUsers } from "../apollo";
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
      score {
        id
      }
    }
  }
`;

const SearchUser = () => {
  const [userData, setUserData] = useState([]);
  const [sortType, setSortType] = useState("username");
  const { data, loading, refetch } = useQuery(SEE_USERS);
  const [deleteScoreMutation] = useMutation(DELETE_SCORE);

  useEffect(() => {
    if (!loading) {
      const users =
        sortType === "username"
          ? [...data.seeUsers.users]
          : [...data.seeUsers.users].sort(
              (a, b) => a.totalScores - b.totalScores
            );
      setUserData(users);
    }
  }, [data, sortType]);

  const deleteScore = async (e) => {
    e.preventDefault();
    try {
      const id = e.target.id;
      const { data: deleteScore } = await deleteScoreMutation({
        variables: { id },
      });

      await purgeAllUsers();

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
            <h1 className="text-2xl font-semibold p-4 border-b border-borderColor dark:border-slate-600 mt-4">
              솔로몬 고위험자
            </h1>
            {userData.map((user) => {
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
            <div className="border-b border-borderColor dark:border-slate-600 flex items-center justify-between mt-4 p-4">
              <h1 className="text-2xl font-semibold">전체 보기</h1>
              <select
                value={sortType}
                onChange={(event) => setSortType(event.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value={"username"}>이름</option>
                <option value={"scores"}>벌점</option>
              </select>
            </div>
            {userData.map((user) => (
              <SearchTable
                key={user.id}
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
