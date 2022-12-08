import { gql, useMutation, useQuery } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { purgeAllUsers } from "../apollo";
import SearchTable from "../components/searchUser/SearchTable";

const SEE_USERS = gql`
  query {
    seeUsers {
      users {
        id
        username
        grade
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
    if (data) {
      const users =
        sortType === "username"
          ? [...data.seeUsers.users]
          : sortType === "demerit"
          ? [...data.seeUsers.users].sort(
              (a, b) => a.totalScores - b.totalScores
            )
          : sortType === "merit"
          ? [...data.seeUsers.users].sort((a, b) => b.totalMerit - a.totalMerit)
          : sortType === "grade" && [
              ...data.seeUsers.users.filter((user) => user.grade === "G6"),
              ...data.seeUsers.users.filter((user) => user.grade === "G7"),
              ...data.seeUsers.users.filter((user) => user.grade === "G8"),
              ...data.seeUsers.users.filter((user) => user.grade === "G9"),
              ...data.seeUsers.users.filter((user) => user.grade === "G10"),
              ...data.seeUsers.users.filter((user) => user.grade === "G11"),
              ...data.seeUsers.users.filter((user) => user.grade === "G12"),
            ];
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
        <Spinner />
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
                    key={user.id}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value={"username"}>이름</option>
                <option value={"demerit"}>벌점</option>
                <option value={"merit"}>상점</option>
                <option value="grade">학년</option>
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
