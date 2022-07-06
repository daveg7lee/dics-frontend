import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";
import { logUserIn } from "../../apollo";
import { useForm } from "react-hook-form";
import Head from "next/head";

const LOG_USER_IN = gql`
  mutation LogUserIn($username: String!, $password: String!) {
    LogUserIn(username: $username, password: $password)
  }
`;

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [logUserInMutation] = useMutation(LOG_USER_IN);

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    try {
      const {
        data: { LogUserIn: token },
      } = await logUserInMutation({
        variables: {
          username,
          password,
        },
      });
      if (token !== "" && token !== undefined) {
        logUserIn(token);
        window.location.reload();
      } else {
        throw Error();
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
    <div className="allCenter flex-col min-h-screen">
      <Head>
        <title>Log In | DICS 벌점 체크 시스템</title>
        <meta name="description" content="로그인" />
      </Head>
      <div className="py-5 px-10 bg-white">
        <h1 className="font-bold text-4xl text-center mb-4">DICS</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Username"
              {...register("username", { required: "username is required" })}
              className="input"
            />
            <input
              placeholder="Password"
              {...register("password", { required: "password is required" })}
              type="password"
              className="input"
            />
            {loading ? (
              <CustomButton
                text={
                  <Loader
                    type="TailSpin"
                    color="white"
                    height={16}
                    width={16}
                    timeout={500000}
                  />
                }
              />
            ) : (
              <CustomButton text="Sign In" width="100%" />
            )}
          </form>
        </div>
        <div className="w-full allCenter mt-4">
          <a
            className="text-center text-blue-500 cursor-pointer"
            href="mailto:daveg7lee@gmail.com"
          >
            계정이 없으신가요?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;