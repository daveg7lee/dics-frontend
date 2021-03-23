/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { IoAddOutline } from "react-icons/io5";
import styled from "styled-components";
import Loading from "../../Components/Loading";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import useInput from "../../Hooks/useInput";
import Input from "../../Components/Input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.div`
  height: 5rem;
  border-bottom: 1px solid #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const Bold = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const SearchContainer = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SearchInput = styled(Input)`
  width: 75%;
  height: 3rem;
  font-size: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
`;

const SearchTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Body = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ClassCard = styled(Link)`
  width: 23rem;
  height: 13rem;
  border-radius: 15px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  color: black;
`;

const TeacherContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  // use your custom style for ".popup-content"
  &-content {
    border-radius: 5px;
    width: 80vw;
    @media (min-width: 1025px) {
      width: 40vw;
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
  }
`;

const SEE_CLASSES = gql`
  {
    seeClasses {
      id
      name
      teacher {
        username
        avatar
      }
    }
  }
`;

const JOIN_CLASS = gql`
  mutation JoinClass($key: String!) {
    JoinClass(key: $key)
  }
`;

export default () => {
  window.scrollTo(0, 0);
  const { data, loading } = useQuery(SEE_CLASSES);
  const key = useInput("");
  const [JoinClassMutation] = useMutation(JOIN_CLASS, {
    variables: { key: key.value },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (key.value !== "") {
      try {
        const {
          data: { JoinClass },
        } = await JoinClassMutation();
        if (JoinClass) {
          window.location.reload();
          toast.success("You Joined");
        }
      } catch (e) {
        toast.error(e);
      }
    }
  };
  return (
    <Container>
      <Header>
        <Bold>Class</Bold>
        <StyledPopup
          trigger={<IoAddOutline size="1.5rem" style={{ cursor: "pointer" }} />}
          modal
          nested
        >
          {(close) => (
            <SearchContainer>
              <SearchBody>
                <SearchTitle>Put Your Secret Key</SearchTitle>
                <Form>
                  <form onSubmit={onSubmit}>
                    <SearchInput
                      placeholder="Secret Key"
                      value={key.value}
                      onChange={key.onChange}
                    />
                  </form>
                </Form>
              </SearchBody>
            </SearchContainer>
          )}
        </StyledPopup>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data.seeClasses.length === 0 ? (
            <Text
              style={{
                height: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              아직 가입한 수업이 없습니다
            </Text>
          ) : (
            <Body>
              {data.seeClasses.map((classRoom) => (
                <ClassCard key={classRoom.id} to={`/classroom/${classRoom.id}`}>
                  <Bold style={{ marginBottom: "3%" }}>{classRoom.name}</Bold>
                  <TeacherContainer>
                    <img
                      src={classRoom.teacher.avatar}
                      alt="Avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "2%",
                        borderRadius: "50%",
                      }}
                    />
                    <Text>{classRoom.teacher.username}</Text>
                  </TeacherContainer>
                </ClassCard>
              ))}
            </Body>
          )}
        </>
      )}
    </Container>
  );
};
