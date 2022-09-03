import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import { purgeAllUsers } from "../apollo";

const CREATE_ACCOUNT = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $type: UserType!
    $grade: GradeType!
  ) {
    createUser(
      input: {
        username: $username
        email: $email
        password: $password
        type: $type
        grade: $grade
      }
    ) {
      success
      error
      user {
        id
      }
    }
  }
`;

function SignUp() {
  const { data: meData, userLoading } = useUser();
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const onValid = async ({ username, grade }) => {
    if (!userLoading) {
      if (meData?.me?.type !== "Admin") {
        router.push("/");
      }
    }
    setLoading(true);

    const { data } = await createAccountMutation({
      variables: {
        username,
        email: ".",
        password: "1q2w3e4r",
        type: "Student",
        grade,
      },
    });

    await purgeAllUsers();

    if (data.createUser.success) {
      toast.success("계정 생성 완료!");
      setLoading(false);
      setValue("username", "");
    } else {
      console.log(data.createUser.error);
      toast.error(data.createUser.error);
    }
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
        <select
          name="grade"
          {...register("grade", { required: true })}
          className="select"
        >
          <option value="G6" selected>
            G6
          </option>
          <option value="G7">G7</option>
          <option value="G8">G8</option>
          <option value="G9">G9</option>
          <option value="G10">G10</option>
          <option value="G11">G11</option>
          <option value="G12">G12</option>
        </select>
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
