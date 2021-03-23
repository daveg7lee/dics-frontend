/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../Components/Input";
import useInput from "../Hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import Button from "../Components/Button";
import Loader from "react-loader-spinner";

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const DescriptionInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const ImageInput = styled.input`
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  line-height: 2.3rem;
`;

const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $files: [String!]!
    $action: String!
  ) {
    createPost(
      title: $title
      description: $description
      files: $files
      action: $action
    ) {
      title
      description
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 1rem 1.5rem;
  width: 30%;
  margin-bottom: 2rem;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default () => {
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const apikey = process.env.REACT_APP_API_KEY;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  let files;
  let formData;
  let urls = [];
  const [loading, setLoading] = useState(false);
  const title = useInput("");
  const description = useInput("");
  const [createPostMutation] = useMutation(CREATE_POST);
  const onChange = (e) => {
    e.preventDefault();
    files = e.target.files;
    formData = new FormData();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("api_key", apikey);
        formData.append("upload_preset", uploadPreset);
        formData.append("timestamp", String(Date.now() / 1000));
        const response = await axios.post(url, formData);
        urls.push(response.data.url);
        toast.success("File Upload Success");
      }
      if (title !== "" && description !== "") {
        const {
          data: { createPost },
        } = await createPostMutation({
          variables: {
            title: title.value,
            description: description.value,
            files: urls,
            action: "Photo",
          },
        });
        if (createPost) {
          toast.success("Post Uploaded");
          window.location.reload();
        }
      }
    } else {
      setLoading(false);
      toast.error("Choose File First");
    }
  };
  return (
    <Container>
      <Title>Upload Image</Title>
      <Form>
        <form onSubmit={onSubmit}>
          <TitleInput
            placeholder="Title"
            value={title.value}
            onChange={title.onChange}
          />
          <DescriptionInput
            placeholder="Description"
            value={description.value}
            onChange={description.onChange}
          />
          <ImageInput
            type="file"
            accept="image/png, image/jpeg"
            onChange={onChange}
            multiple
            max={20}
          />
          {loading ? (
            <Button
              text={
                <Loader
                  type="TailSpin"
                  color="white"
                  height={16}
                  width={16}
                  timeout={500000}
                />
              }
            />
          ) : (
            <Button text="Upload" />
          )}
        </form>
      </Form>
    </Container>
  );
};
