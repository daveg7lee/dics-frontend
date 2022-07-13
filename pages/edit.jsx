import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import EditInputContainer from "../components/Edit/EditInputContainer";

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
    }
  }
`;

const BUCKET_URL = "https://dics-bucket.s3.ap-northeast-2.amazonaws.com/";

const Edit = () => {
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
      let avatar;

      if (files.length !== 0) {
        avatar = await uploadFile(files[0]);
      }

      if (oldPassword && !newPassword) {
        toast.error("새로운 비밀번호를 입력하세요");
        return;
      }

      const {
        data: {
          updateUser: { success },
        },
      } = await editProfileMutation({
        variables: {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
          avatar,
        },
      });

      if (success) {
        toast.success("Profile Updated");
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
    <div className="layout">
      <div className="min-h-screen flex items-center justify-center">
        <div className="md:flex w-full h-full">
          <div className="w-[45%] h-full md:m-0 mb-2">
            <h1 className="text-2xl font-semibold">Account Information</h1>
          </div>

          <form
            className="w-full h-full p-4 border border-gray-300 rounded"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-evenly px-4 mb-2">
              <div className="flex flex-col items-center justify-center w-full mx-2">
                <label className="mb-[5px]">Avatar</label>
                {loading ? (
                  <div className="w-16 h-16 rounded-full animate-pulse bg-gray-300" />
                ) : (
                  <img
                    alt="preview"
                    width={64}
                    height={64}
                    src={previewUrl}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <label
                  className="mb-[5px]"
                  htmlFor="file"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  찾아보기
                </label>
                <input
                  id="file"
                  onChange={onFileLoad}
                  type="file"
                  className="hidden"
                />
              </div>
            </div>
            <EditInputContainer name={"Email"}>
              <input
                {...register("email", { required: false })}
                placeholder="Email"
                className="input"
              />
            </EditInputContainer>
            <EditInputContainer name={"Old Password"}>
              <input
                {...register("oldPassword", { required: false })}
                placeholder="Old Password"
                className="input"
                type="password"
              />
            </EditInputContainer>
            <EditInputContainer name={"New Password"}>
              <input
                {...register("newPassword", { required: false })}
                placeholder="New Password"
                className="input"
                type="password"
              />
            </EditInputContainer>
            <CustomButton text="Save" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
