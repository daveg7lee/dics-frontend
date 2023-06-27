import { useMutation, gql } from "@apollo/client";
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
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import Seo from "../components/SEO";

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

const Index = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [logUserInMutation] = useMutation(LOG_USER_IN);

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
      h="100vh"
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
    </Box>
  );
};

export default Index;
