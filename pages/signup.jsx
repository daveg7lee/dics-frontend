import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { purgeAllUsers } from "../apollo";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import AdminOnlyPage from "../components/ProtectedPages/AdminOnlyPage";

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
  const toast = useToast();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const onValid = async ({ username, grade }) => {
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
      toast({
        title: "계정 생성 완료!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      setValue("username", "");
    } else {
      setLoading(false);
      toast({
        title: data.createUser.error,
        status: "error",
      });
    }
  };
  return (
    <AdminOnlyPage>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="full"
        h="100vh"
      >
        <Heading mb={4} fontSize="3xl">
          학생 추가
        </Heading>
        <FormControl as="form" maxW="md" onSubmit={handleSubmit(onValid)}>
          <Input
            placeholder="이름"
            mb={2}
            {...register("username", { required: true })}
          />
          <Select mb={2} {...register("grade", { required: true })}>
            <option value="G6" selected>
              G6
            </option>
            <option value="G7">G7</option>
            <option value="G8">G8</option>
            <option value="G9">G9</option>
            <option value="G10">G10</option>
            <option value="G11">G11</option>
            <option value="G12">G12</option>
          </Select>
          <Button mt={2} w="full" type="submit">
            {loading ? "등록중..." : "학생 추가"}
          </Button>
        </FormControl>
      </Box>
    </AdminOnlyPage>
  );
}

export default SignUp;
