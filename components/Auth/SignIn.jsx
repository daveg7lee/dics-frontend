import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";
import { logUserIn } from "../../apollo";
import { useForm } from "react-hook-form";

const LOG_USER_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      success
      token
      error
    }
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
        window.location.reload();
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

export default SignIn;
