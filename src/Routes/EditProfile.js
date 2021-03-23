/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../Components/Button";
import Input from "../Components/Input";
import useInput from "../Hooks/useInput";
import { ME } from "../SharedQueries";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const TitleWrapper = styled.div`
  width: 45%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`;

const FormWrapper = styled.div`
  width: 55%;
  height: 100%;
`;

const Form = styled.div`
  width: 100%;
  padding: 1rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const SubmitWrapper = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #f9fafb;
  box-shadow: 0px 10px 5px -5px rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 400;
  width: 100%;
  text-align: start;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 8px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 1rem;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const EDIT_PROFILE = gql`
  mutation editProfile(
    $email: String
    $avatar: String
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

export default () => {
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const apikey = process.env.REACT_APP_API_KEY;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const { data, loading } = useQuery(ME);
  const email = useInput("");
  const oldPassword = useInput("");
  const newPassword = useInput("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [editProfileMutation] = useMutation(EDIT_PROFILE, {
    variables: {
      email: email.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    },
  });
  useEffect(() => {
    if (!loading) {
      email.setValue(data.me.email);
      setPreview(data.me.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const onChange = async (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setPreview(base64.toString());
      }
    };
    if (file) {
      setImage(file);
      reader.readAsDataURL(file);
    }
  };
  const OnSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("api_key", apikey);
      formData.append("upload_preset", uploadPreset);
      formData.append("timestamp", String(Date.now() / 1000));
      const response = await axios.post(url, formData);
      const {
        data: { editProfile },
      } = await editProfileMutation({
        variables: { avatar: response.data.url },
      });
      if (editProfile) {
        toast.success("Profile Updated");
      }
    } else {
      const {
        data: { editProfile },
      } = await editProfileMutation();
      if (editProfile) {
        toast.success("Profile Updated");
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <InfoWrapper>
          <TitleWrapper>
            <Title>Account Information</Title>
          </TitleWrapper>
          <FormWrapper>
            <Form>
              <InputContainer>
                <InputWrapper>
                  <Label>Email</Label>
                  <Input
                    value={email.value}
                    onChange={email.onChange}
                    placeholder="Email"
                  />
                </InputWrapper>
              </InputContainer>
              <InputContainer>
                <InputWrapper>
                  <Label>Old Password</Label>
                  <Input
                    value={oldPassword.value}
                    onChange={oldPassword.onChange}
                    placeholder="Old Password"
                    type="password"
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label>New Password</Label>
                  <Input
                    value={newPassword.value}
                    onChange={newPassword.onChange}
                    placeholder="New Password"
                    type="password"
                  />
                </InputWrapper>
              </InputContainer>
              <InputContainer>
                <InputWrapper>
                  <Label>Avatar</Label>
                  {loading ? (
                    <Skeleton circle={true} width={"4rem"} height={"4rem"} />
                  ) : (
                    <Avatar src={preview} />
                  )}
                  <Label
                    htmlFor="file"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    찾아보기
                  </Label>
                  <input
                    id="file"
                    onChange={onChange}
                    type="file"
                    style={{
                      visibility: "hidden",
                      position: "absolute",
                      zIndex: "-1",
                    }}
                  />
                </InputWrapper>
              </InputContainer>
            </Form>
            <SubmitWrapper>
              <Button text="Save" onClick={OnSubmit} />
            </SubmitWrapper>
          </FormWrapper>
        </InfoWrapper>
      </Wrapper>
    </Container>
  );
};
