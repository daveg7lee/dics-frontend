import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $bio: String
    $password: String!
    $type: String!
    $avatar: String
  ) {
    createAccount(
      username: $username
      email: $email
      bio: $bio
      password: $password
      type: $type
      avatar: $avatar
    )
  }
`;

function SignUp() {
  const { data, userLoading } = useUser();
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const onValid = async ({ username }) => {
    if (!userLoading) {
      if (data?.me?.type !== "Admin") {
        router.push("/");
      }
    }
    setLoading(true);
    await createAccountMutation({
      variables: {
        username,
        email: ".",
        password: "1q2w3e4r",
        type: "Student",
      },
    });
    toast.success("계정 생성 완료!");
    setLoading(false);
    setValue("username", "");
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl font-bold mb-3">학생 추가</h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col w-96 justify-center items-center"
      >
        <input
          className="input"
          placeholder="이름"
          {...register("username", { required: true })}
        />
        <input
          type="submit"
          className="blueButton"
          value={loading ? "등록중..." : "학생 추가"}
        />
      </form>
    </div>
  );
}

export default SignUp;
