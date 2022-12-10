import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import AdminOnlyPage from "../components/ProtectedPages/AdminOnlyPage";

const SEARCH_SCORE = gql`
  query searchScore($term: String!) {
    searchScore(term: $term) {
      scores {
        id
        uploader
        date
        score
        article
        user {
          username
        }
      }
      success
    }
  }
`;

const SearchScore = () => {
  const { register, watch } = useForm();
  const { data, loading } = useQuery(SEARCH_SCORE, {
    variables: { term: watch("term") ? watch("term") : "" },
  });

  const dateOnChange = (e) => {
    const {
      target: { value },
    } = e;
    e.preventDefault();
    const searchScore = data.searchScore.filter((score) =>
      score.date.includes(value)
    );
    setShowData({ searchScore });
  };

  return (
    <AdminOnlyPage>
      <Box pt={24} px={{ lg: 32, md: 24, sm: 8 }}>
        <Heading fontSize="3xl" mb={4}>
          상벌점 조회
        </Heading>
        <Box>
          <Input placeholder="Uploader Name" {...register("term")} mb={2} />
          <Input type="month" onChange={dateOnChange} />
        </Box>
        <Heading fontSize="2xl" py={4}>
          검색 결과
        </Heading>
        {loading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>입력자</Th>
                  <Th>학생 이름</Th>
                  <Th>솔로몬 조항</Th>
                  <Th>날짜</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.searchScore.scores.map((score) => (
                  <Tr key={score.id}>
                    <Td>{score.uploader}</Td>
                    <Td>{score.user.username}</Td>
                    <Td>{score.article}</Td>
                    <Td>
                      {score.date.replace(/T.*/, "").split("-").join("-")}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AdminOnlyPage>
  );
};

export default SearchScore;
