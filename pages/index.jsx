import { useMutation, gql, useQuery } from "@apollo/client";
import { logUserIn } from "../apollo";
import cookie from "cookie";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import Seo from "../components/SEO";
import SearchTable from "../components/searchUser/SearchTable";

const LOG_USER_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      success
      token
      error
    }
  }
`;

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export async function getServerSideProps({ req, res }) {
  if (req && res) {
    const cookies = parseCookies(req);

    if (cookies.TOKEN) {
      res.writeHead(303, { Location: "/home" });
      res.end();
    }
  }

  return { props: {} };
}

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

const Index = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [logUserInMutation] = useMutation(LOG_USER_IN);
  const { data, refetch } = useQuery(SEE_USERS);

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    try {
      const {
        data: {
          login: { success, error, token },
        },
      } = await logUserInMutation({
        variables: {
          username,
          password,
        },
      });

      if (success) {
        logUserIn(token);
        router.push("/home");
      } else {
        throw Error(error);
      }
    } catch (e) {
      setLoading(false);
      const errorMessage = e.message
        .replace("GraphQL", "")
        .replace("error", "")
        .replace(":", "");
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minH="100vh"
      py="24"
    >
      <Seo
        title="Login"
        description="DICS 학생들의 벌점 관리 및 다양한 편의 기능을 위한 웹 사이트"
        keywords="DICS 벌점, DICS 학생 관리, DICS, DICS 상점"
      />
      <Box>
        <Heading fontSize="3xl" mb={4} textAlign="center">
          DICS Students
        </Heading>

        <FormControl maxW="sm" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Username"
            size={"md"}
            mb={2}
            {...register("username", { required: "username is required" })}
          />
          <Input
            placeholder="Password"
            size={"md"}
            mb={2}
            {...register("password", { required: "password is required" })}
            type="password"
          />

          <Button width="100%" type="submit">
            {loading ? <Spinner size="sm" /> : "Sign In"}
          </Button>
        </FormControl>
        <Box display="flex" justifyContent="center" mt={4}>
          <Link href="mailto:daveg7lee@gmail.com" isExternal color="blue.400">
            비밀번호를 모른다면?
          </Link>
        </Box>
      </Box>
      <Heading textAlign="left" mt="10">
        솔로몬 위험자 목록
      </Heading>
      <TableContainer mt="4">
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
            {data?.seeUsers.users?.map((user) => {
              if (user.totalScores + user.totalMerit <= -1) {
                return (
                  <SearchTable
                    key={user.id}
                    user={user}
                    refetch={refetch}
                    isAdmin={false}
                  />
                );
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Index;
