import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Heading,
  Select,
  Spinner,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Table,
  Text,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
        fullScores
        fullMerit
        attendance
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

const SearchUser = () => {
  const [userData, setUserData] = useState([]);
  const [sortType, setSortType] = useState("username");
  const { data, loading, refetch } = useQuery(SEE_USERS);

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
          : sortType === "totalDemerit"
          ? [...data.seeUsers.users].sort((a, b) => a.fullScores - b.fullScores)
          : sortType === "totalMerit"
          ? [...data.seeUsers.users].sort((a, b) => b.fullMerit - a.fullMerit)
          : sortType === "grade" && [
              ...data.seeUsers.users.filter((user) => user.grade === "G12"),
              ...data.seeUsers.users.filter((user) => user.grade === "G11"),
              ...data.seeUsers.users.filter((user) => user.grade === "G10"),
              ...data.seeUsers.users.filter((user) => user.grade === "G9"),
              ...data.seeUsers.users.filter((user) => user.grade === "G8"),
              ...data.seeUsers.users.filter((user) => user.grade === "G7"),
              ...data.seeUsers.users.filter((user) => user.grade === "G6"),
              ...data.seeUsers.users.filter((user) => user.grade === "G5"),
            ];
      setUserData(users);
    }
  }, [data, sortType]);

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
              출석체크
            </Heading>
            <Text
              whiteSpace="nowrap"
              overflow="auto"
              fontSize="3xl"
              fontWeight="bold"
              py="3"
            >
              {userData
                .filter((user) => user.attendance !== true)
                .map((user) => `  ${user.username}  `)}
            </Text>
            <Heading
              fontSize="2xl"
              p={4}
              mt={4}
              borderBottom="1px"
              borderColor="gray.200"
            >
              솔로몬 고위험자
            </Heading>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>학년</Th>
                    <Th>프로필</Th>
                    <Th>이름</Th>
                    <Th>이번학기 벌점</Th>
                    <Th>이번학기 상점</Th>
                    <Th>이번학기 총 점수</Th>
                    <Th>이번달 벌점</Th>
                    <Th>이번달 상점</Th>
                    <Th>이번달 총 점수</Th>
                    <Th>출석체크 현황</Th>
                    <Th>전체보기</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userData?.map((user) => {
                    if (user.totalScores + user.totalMerit <= -15) {
                      return (
                        <SearchTable
                          key={user.id}
                          user={user}
                          refetch={refetch}
                        />
                      );
                    }
                  })}
                </Tbody>
              </Table>
            </TableContainer>
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
                w="32"
                value={sortType}
                onChange={(event) => setSortType(event.target.value)}
              >
                <option value={"username"}>이름</option>
                <option value={"demerit"}>이번달 벌점</option>
                <option value={"merit"}>이번달 상점</option>
                <option value={"totalDemerit"}>이번학기 벌점</option>
                <option value={"totalMerit"}>이번학기 상점</option>
                <option value="grade">학년</option>
              </Select>
            </Box>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>학년</Th>
                    <Th>프로필</Th>
                    <Th>이름</Th>
                    <Th>이번학기 벌점</Th>
                    <Th>이번학기 상점</Th>
                    <Th>이번학기 총 점수</Th>
                    <Th>이번달 벌점</Th>
                    <Th>이번달 상점</Th>
                    <Th>이번달 총 점수</Th>
                    <Th>출석체크 현황</Th>
                    <Th>전체보기</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userData?.map((user) => (
                    <SearchTable key={user.id} user={user} refetch={refetch} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </AdminOnlyPage>
  );
};

export default SearchUser;
