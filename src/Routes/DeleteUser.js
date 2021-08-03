import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username)
  }
`;

function DeleteUser() {
  const { register, handleSubmit, setValue } = useForm();
  const [deleteUserMutation] = useMutation(DELETE_USER);
  const onValid = async ({ username }) => {
    await deleteUserMutation({
      variables: { username },
    });
    setValue('username', '');
    toast.success('계정 삭제 완료!');
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
          {...register('username', { required: true })}
        />
        <input type="submit" className="blueButton" value="학생 제거" />
      </form>
    </div>
  );
}

export default DeleteUser;
