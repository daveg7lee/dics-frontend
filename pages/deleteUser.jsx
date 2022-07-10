import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";

const DELETE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      success
      error
    }
  }
`;

function DeleteUser() {
  const { data, loading } = useUser();
  const router = useRouter();
  const { register, handleSubmit, setValue, formState } = useForm();
  const [deleteUserMutation] = useMutation(DELETE_USER);

  const onValid = async ({ username }) => {
    if (!loading) {
      if (data?.me?.type !== "Admin") {
        router.push("/");
      }
    }
    await deleteUserMutation({
      variables: { username },
    });
    setValue("username", "");
    toast.success("계정 삭제 완료!");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl font-bold mb-3">학생 제거</h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col w-96 justify-center items-center"
      >
        <input
          className="input"
          placeholder="이름"
          {...register("username", { required: true })}
        />
        {formState?.errors?.username?.message && (
          <p>{formState?.errors?.username?.message}</p>
        )}
        <input type="submit" className="blueButton" value="학생 제거" />
      </form>
    </div>
  );
}

export default DeleteUser;
