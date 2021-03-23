/* eslint-disable import/no-anonymous-default-export */
import { gql } from "apollo-boost";
import React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Components/Button";
import CustomPopup from "../../Components/CustomPopup";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import useInput from "../../Hooks/useInput";
import { SEE_CLASS_AND_ME } from "./ClassQueries";

const Container = styled.div``;

const Header = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.div`
  width: 18rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 1.5rem;
`;

const Baner = styled.div`
  width: 80%;
  height: 40vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -5px 25px -5px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5em;
`;

const NavLink = styled(Link)`
  text-align: center;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  border-bottom-width: 2px;
  border-color: transparent;
  font-weight: 500;
  line-height: 1.25rem;
  --text-opacity: 1;
  color: #6b7280;
  color: rgba(107, 114, 128, var(--text-opacity));
  transition-duration: 0.15s;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    --text-opacity: 1;
    color: #374151;
    color: rgba(55, 65, 81, var(--text-opacity));
  }
  :focus {
    outline: none;
  }
`;

const ClassNameContainer = styled.div`
  width: fit-content;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -5px 25px -5px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
  :before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
    filter: blur(10px);
    margin: -20px;
  }
`;

const ClassName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Code = styled.span``;

const Body = styled.div`
  width: 80%;
  display: flex;
`;

const InputBox = styled.div`
  width: 100%;
  height: 4rem;
  box-shadow: 0 20px 10px -5px rgba(0, 0, 0, 0.04),
    0 10px 5px -5px rgba(0, 0, 0, 0.04), 0 -5px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

const HomeworkContainer = styled.div`
  width: 100%;
`;

const HomeworkBox = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 2rem;
  form {
    margin-top: 1rem;
    width: 100%;
    label {
      font-size: 0.8rem;
      font-weight: 500;
      opacity: 0.5;
    }
    input {
      width: 100%;
      ::placeholder {
        font-size: 0.8rem;
        font-weight: 500;
      }
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const HomeworkInput = styled(Input)`
  height: 2.5rem;
`;

const Bold = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Deadline = styled.span``;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Teacher = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ADD_HOME_WORK = gql`
  mutation addHomeWorks(
    $title: String!
    $id: ID!
    $description: String
    $deadline: String!
  ) {
    addHomeWorks(
      title: $title
      id: $id
      description: $description
      deadline: $deadline
    )
  }
`;

export default () => {
  window.scrollTo(0, 0);
  const id = window.location.href.split("/")[5];
  const title = useInput("");
  const min = new Date().toISOString().substr(0, 16);
  const description = useInput("");
  const deadLine = useInput("");
  const { data, loading } = useQuery(SEE_CLASS_AND_ME, { variables: { id } });
  const [addHomeWorksMutation] = useMutation(ADD_HOME_WORK);
  const onSubmit = async (e) => {
    e.preventDefault();
    const time = deadLine.value.substr(11, 13);
    const intTime = parseInt(time);
    let str;
    let cvHour;
    if (intTime < 12) {
      str = "오전 ";
    } else {
      str = "오후 ";
    }
    if (intTime === 12) {
      cvHour = intTime;
    } else {
      cvHour = intTime % 12;
    }
    const hour = str + ("0" + cvHour).slice(-2) + time.slice(-3);
    const date = deadLine.value.substr(0, 11).replace("-", ".");
    const deadline = date + hour;
    try {
      const {
        data: { addHomeWorks },
      } = await addHomeWorksMutation({
        variables: {
          deadline,
          title: title.value,
          id,
          description: description.value,
        },
      });
      if (addHomeWorks) {
        window.location.reload();
        toast.success("Homework Added");
      }
    } catch (e) {
      const errorMessage = e.message
        .replace("GraphQL", "")
        .replace("error", "")
        .replace(":", "");
      toast.error(errorMessage);
    }
  };
  return (
    <Container>
      <Header>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Nav>
              <NavLink to={`/classroom/${id}`}>Homework</NavLink>
              <NavLink to={`/classroom/${id}/user`}>User</NavLink>
            </Nav>
            <Baner style={{ backgroundColor: data.seeClass.color }}>
              <ClassNameContainer>
                <ClassName>{data.seeClass.name}</ClassName>
                <Code>
                  수업코드 {""}
                  {data.seeClass.key}
                </Code>
              </ClassNameContainer>
            </Baner>
            <Body>
              <HomeworkContainer>
                {data.me.type === "Teacher" &&
                  data.seeClass.teacher.id === data.me.id && (
                    <CustomPopup
                      trigger={<InputBox>New Homework</InputBox>}
                      contents={
                        <Form>
                          <Bold>Upload Homework</Bold>
                          <form onSubmit={onSubmit}>
                            <label>Title</label>
                            <HomeworkInput
                              placeholder="title"
                              value={title.value}
                              onChange={title.onChange}
                            />
                            <label>Description</label>
                            <HomeworkInput
                              placeholder="description"
                              value={description.value}
                              onChange={description.onChange}
                            />
                            <label>Dead Line</label>
                            <HomeworkInput
                              placeholder="Deadline"
                              type="datetime-local"
                              value={deadLine.value}
                              min={min}
                              onChange={deadLine.onChange}
                            />
                            <Button text="Submit" />
                          </form>
                        </Form>
                      }
                    />
                  )}
                {data.seeClass.homeworks.map((homework) => (
                  <HomeworkBox key={homework.id}>
                    <Content>
                      <Teacher>
                        <img
                          src={data.seeClass.teacher.avatar}
                          alt="Teacher"
                          style={{
                            maxWidth: "40px",
                            marginRight: "0.5rem",
                            borderRadius: "50%",
                          }}
                        />
                        {data.seeClass.teacher.username}
                      </Teacher>
                      <Deadline>
                        기한{" : "}
                        {homework.deadline.replace("T", " ").replace("-", ".")}
                      </Deadline>
                    </Content>
                  </HomeworkBox>
                ))}
              </HomeworkContainer>
            </Body>
          </>
        )}
      </Header>
    </Container>
  );
};
