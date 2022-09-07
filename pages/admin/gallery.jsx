import { Loading } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const CREATE_PHOTO = gql`
  mutation createPhoto($files: [String!]!, $caption: String!) {
    createPhoto(createPhotoInput: { files: $files, caption: $caption }) {
      success
      error
      photo {
        id
        files
        caption
      }
    }
  }
`;

const GalleryAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [createPhotoMutation] = useMutation(CREATE_PHOTO);
  const { register, handleSubmit } = useForm();

  const onValid = async ({ files, caption }) => {
    try {
      setLoading(true);

      let urls = [];

      for (let i = 0; i < files.length; i++) {
        const {
          data: { uploadURL },
        } = await axios.post("/api/cloudflare/uploadFile");

        const formData = new FormData();
        formData.append("file", files[i]);

        const { data } = await axios.post(uploadURL, formData);
        urls.push(data.result.variants[0]);
      }

      const {
        data: {
          createPhoto: { success, error },
        },
      } = await createPhotoMutation({ variables: { files: urls, caption } });

      if (success) {
        toast.success("업로드 되었습니다!");
      } else {
        toast.error(error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-28 layout">
      <h1 className="text-2xl font-bold mb-8">사진 업로드</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="file_input"
        >
          사진 선택
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          multiple
          accept="image/*"
          {...register("files", { required: true })}
        />
        <label
          htmlFor="caption"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-4"
        >
          설명
        </label>
        <input
          type="text"
          className="input"
          id="caption"
          {...register("caption")}
          placeholder="사진에 대한 설명을 적어주세요. (선택)"
        />
        <button className="blueButton">
          {loading ? <Loading /> : "업로드"}
        </button>
      </form>
    </div>
  );
};

export default GalleryAdmin;
