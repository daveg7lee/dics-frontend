import { useMutation, gql } from "@apollo/client";
import { logUserIn } from "../apollo";
import CustomButton from "../components/CustomButton";
import cookie from "cookie";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { Input, Spinner } from "@chakra-ui/react";

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
    <>
      <div className="allCenter flex-col min-h-screen">
        <div className="py-5 px-10">
          <h1 className="font-bold text-4xl text-center mb-4">DICS</h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Username"
                size={"md"}
                mb={4}
                {...register("username", { required: "username is required" })}
              />
              <Input
                placeholder="Password"
                size={"md"}
                mb={4}
                {...register("password", { required: "password is required" })}
                type="password"
              />
              {loading ? (
                <CustomButton text={<Spinner />} />
              ) : (
                <CustomButton text="Sign In" width="100%" />
              )}
              <div className="flex justify-center mt-5">
                <a
                  href="mailto:daveg7lee@gmail.com"
                  className="text-center w-full text-blue-300"
                >
                  비밀번호를 모른다면?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center w-full absolute bottom-0">
        <a href="https://stellate.co/?ref=powered-by">
          <img
            src="https://stellate.co/badge.svg"
            alt="Powered by Stellate, the GraphQL Edge Cache"
            className="block dark:hidden"
          />
          <img
            src="https://stellate.co/badge-light.svg"
            alt="Powered by Stellate, the GraphQL Edge Cache"
            className="hidden dark:block"
          />
        </a>
      </footer>
    </>
  );
};

export default Index;
