import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { purgeAllUsers } from "../apollo";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPages/ProtectedPage";

const EDIT_PROFILE = gql`
  mutation updateUser(
    $email: String
    $avatar: String
    $oldPassword: String
    $newPassword: String
  ) {
    updateUser(
      input: {
        email: $email
        avatar: $avatar
        oldPassword: $oldPassword
        newPassword: $newPassword
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

const BUCKET_URL = "https://dics-bucket.s3.ap-northeast-2.amazonaws.com/";

const Edit = () => {
  const router = useRouter();
  const { data: userData, loading } = useUser();
  const { register, handleSubmit, setValue } = useForm();
  const [previewUrl, setPreviewUrl] = useState("");
  const [files, setFiles] = useState([]);

  const [editProfileMutation] = useMutation(EDIT_PROFILE);

  const preview = () => {
    if (files.length === 0) return;

    const reader = new FileReader();

    reader.onload = () => {
      reader.result && setPreviewUrl(String(reader.result));
    };

    reader.readAsDataURL(files[0]);
  };

  useEffect(() => {
    setValue("email", userData?.me?.email);
    setPreviewUrl(userData?.me?.avatar);
  }, [userData, setValue]);

  useEffect(() => {
    preview();
  }, [files, preview]);

  const onFileLoad = (e) => {
    const file = e.target.files;
    setFiles(file);
  };

  const onSubmit = async ({ email, oldPassword, newPassword }) => {
    try {
      if (!email || !oldPassword || !newPassword) {
        toast.error("값을 입력하세요");
        return;
      }

      let avatar;

      if (files.length !== 0) {
        if (files[0].size > 2000000) {
          toast.error("이미지 용량이 너무 큽니다");
          setIsLoading(false);
          return;
        }
        avatar = await uploadFile(files[0]);
      }

      if (oldPassword && !newPassword) {
        toast.error("새로운 비밀번호를 입력하세요");
        return;
      }

      const {
        data: {
          updateUser: { success, error },
        },
      } = await editProfileMutation({
        variables: {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
          avatar,
        },
      });

      await purgeAllUsers();

      if (success) {
        toast.success("Profile Updated");
        router.push("/");
      } else {
        toast.error(error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const uploadFile = async (file) => {
    const { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    const url = data.url;

    await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    return BUCKET_URL + file.name;
  };

  return (
    <ProtectedPage>
      <Box
        px={{ lg: 32, md: 24, sm: 8 }}
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="center"
      >
        <Heading fontSize="3xl" mb={4}>
          Account Information
        </Heading>
        <FormControl
          w="full"
          h="full"
          p={4}
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          as="form"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Avatar src={previewUrl} size="xl" rounded="full" mb={4} />

          <Input id="file" onChange={onFileLoad} type="file" mb={2} />

          <Input
            {...register("email", { required: false })}
            placeholder="Email"
            mb={2}
          />

          <Input
            {...register("oldPassword", { required: false })}
            placeholder="Old Password"
            type="password"
            mb={2}
          />

          <Input
            {...register("newPassword", { required: false })}
            placeholder="New Password"
            type="password"
            mb={2}
          />
          <Button mt={2} w="full" type="submit">
            Save
          </Button>
        </FormControl>
      </Box>
    </ProtectedPage>
  );
};

export default Edit;
