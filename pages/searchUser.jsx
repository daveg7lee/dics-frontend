import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Center, Heading, Select, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { purgeAllUsers } from "../apollo";
import AdminOnlyPage from "../components/ProtectedPages/AdminOnlyPage";
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
    <AdminOnlyPage>
      <Box pt={20}>
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Box px={10}>
            <Heading
              fontSize="2xl"
              p={4}
              mt={4}
              borderBottom="1px"
              borderColor="gray.200"
            >
              솔로몬 고위험자
            </Heading>
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={20}
              p={4}
              borderBottom="1px"
              borderColor="gray.200"
            >
              <Heading fontSize="2xl">전체 보기</Heading>
              <Select
                w={20}
                value={sortType}
                onChange={(event) => setSortType(event.target.value)}
              >
                <option value={"username"}>이름</option>
                <option value={"demerit"}>벌점</option>
                <option value={"merit"}>상점</option>
                <option value="grade">학년</option>
              </Select>
            </Box>
            {userData.map((user) => (
              <SearchTable
                key={user.id}
                user={user}
                totalScore={user.totalScores}
                totalMerit={user.totalMerit}
                deleteScore={deleteScore}
              />
            ))}
          </Box>
        )}
      </Box>
    </AdminOnlyPage>
  );
};

export default SearchUser;
