import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { purgeAllUsers } from "../apollo";
import AdminOnlyPage from "../components/ProtectedPages/AdminOnlyPage";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";

const DELETE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      success
      error
    }
  }
`;

function DeleteUser() {
  const toast = useToast();
  const { register, handleSubmit, setValue, formState } = useForm();
  const [deleteUserMutation] = useMutation(DELETE_USER, {
    onCompleted: async (data) => {
      if (data.removeUser.success) {
        setValue("username", "");
        toast({
          title: "계정이 삭제되었습니다!",
          status: "success",
        });
        await purgeAllUsers();
      } else {
        toast({
          title: data.removeUser.error,
          status: "error",
          duration: 1500,
        });
      }
    },
  });

  const onValid = async ({ username }) => {
    await deleteUserMutation({
      variables: { username },
    });
  };

  return (
    <AdminOnlyPage>
      <Box
        w="full"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading mb={4} fontSize="3xl">
          학생 제거
        </Heading>
        <FormControl as="form" onSubmit={handleSubmit(onValid)} maxW="sm">
          <Input
            placeholder="이름"
            {...register("username", { required: true })}
          />
          {formState?.errors?.username?.message && (
            <FormErrorMessage>
              {formState?.errors?.username?.message}
            </FormErrorMessage>
          )}
          <Button type="submit" w="full" mt={4}>
            학생 제거
          </Button>
        </FormControl>
      </Box>
    </AdminOnlyPage>
  );
}

export default DeleteUser;
