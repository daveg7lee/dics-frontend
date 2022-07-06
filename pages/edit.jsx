import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomButton from "../components/CustomButton";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import EditInputContainer from "../components/Edit/EditInputContainer";

const EDIT_PROFILE = gql`
  mutation editProfile(
    $email: String
    $avatar: Upload
    $bio: String
    $oldPassword: String
    $newPassword: String
  ) {
    editProfile(
      email: $email
      avatar: $avatar
      bio: $bio
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;

const Edit = () => {
  const router = useRouter();
  const { data, loading } = useUser();
  const { register, handleSubmit, setValue } = useForm();
  const [preview, setPreview] = useState("");
  const [editProfileMutation] = useMutation(EDIT_PROFILE);

  useEffect(() => {
    setValue("email", data?.me?.email);
    setPreview(data?.me?.avatar);
  }, [data, setValue]);

  const onChange = async ({
    target: {
      files: [file],
    },
  }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setPreview(base64.toString());
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      const {
        data: { editProfile },
      } = await editProfileMutation({
        variables: { avatar: file },
      });
      if (editProfile) {
        toast.success("Profile Updated");
        router.push("/");
      }
    }
  };

  const onSubmit = async ({ email, oldPassword, newPassword }) => {
    const {
      data: { editProfile },
    } = await editProfileMutation({
      variables: {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });
    if (editProfile) {
      toast.success("Profile Updated");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-4/5 h-full">
        <div className="md:flex">
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
                  <Image
                    alt="preview"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                    src={preview}
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
                  onChange={onChange}
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
                {...register("oldPassword", { required: true })}
                placeholder="Old Password"
                className="input"
              />
            </EditInputContainer>
            <EditInputContainer name={"New Password"}>
              <input
                {...register("newPassword", { required: true })}
                placeholder="New Password"
                className="input"
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
