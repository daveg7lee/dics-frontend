import { Loading, Table, useAsyncList } from "@nextui-org/react";
import { BiTrashAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { request } from "graphql-request";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

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

const DELETE_PHOTO = gql`
  mutation removePhoto($id: String!) {
    removePhoto(id: $id) {
      success
      error
    }
  }
`;

const GalleryAdmin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [createPhotoMutation] = useMutation(CREATE_PHOTO);
  const [deletePhotoMutation] = useMutation(DELETE_PHOTO);
  const { register, handleSubmit } = useForm();

  async function load({ signal, cursor }) {
    console.log(cursor);

    const endpoint = "http://localhost:4000/graphql";
    const query = cursor
      ? `{
      photos(cursor: "${cursor}") {
        success
        error
        photos {
          id
          files
          caption
        }
      }
    }`
      : `{
      photos {
        success
        error
        photos {
          id
          files
          caption
        }
      }
    }`;

    const res = await request(endpoint, query);

    return {
      items: res.photos.photos,
      cursor: res.photos.photos[res.photos.photos.length - 1].id,
    };
  }

  const list = useAsyncList({ load });

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

  const onClickDelete = async (id, files) => {
    const {
      data: {
        removePhoto: { success, error },
      },
    } = await deletePhotoMutation({ variables: { id } });

    await Promise.all(
      files.map(async (file) => {
        const imageId = file.split("/")[4];
        await axios.delete(`/api/cloudflare/delete/${imageId}`);
      })
    );

    if (success) {
      toast.success("삭제 되었습니다!");
      router.reload();
    } else {
      toast.error(error);
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
      <h1 className="text-2xl font-bold my-8">사진 삭제</h1>

      <Table
        bordered
        shadow={false}
        aria-label="Example table with dynamic content & infinity pagination"
        css={{
          minWidth: "100%",
          height: "calc($space$14 * 50)",
          zIndex: 5,
          color: "white",
        }}
        color="secondary"
      >
        <Table.Header>
          <Table.Column hideHeader align="center" width="50%">
            photo
          </Table.Column>
          <Table.Column width="30%" align="center">
            설명
          </Table.Column>
          <Table.Column hideHeader align="center" width="20%">
            actions
          </Table.Column>
        </Table.Header>
        <Table.Body
          items={list.items}
          loadingState={list.loadingState}
          onLoadMore={list.loadMore}
        >
          {(item) => (
            <Table.Row key={item.id}>
              <Table.Cell css={{ width: "50%" }}>
                <img src={item.files[0]} />
              </Table.Cell>
              <Table.Cell css={{ width: "30%" }}>
                <p className="text-black dark:text-white text-center w-full">
                  {item.caption}
                </p>
              </Table.Cell>
              <Table.Cell css={{ width: "20%" }}>
                <div
                  className="flex justify-center items-center text-xl"
                  onClick={() => onClickDelete(item.id, item.files)}
                >
                  <BiTrashAlt className="text-red-500 cursor-pointer" />
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default GalleryAdmin;
