/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loading from "../../Components/Loading";
import { SEE_CLASS_AND_ME } from "./ClassQueries";

const Container = styled.div``;

const List = styled.ul``;

const Item = styled.li``;

export default () => {
  window.scrollTo(0, 0);
  const id = window.location.href.split("/")[5];
  const { data, loading } = useQuery(SEE_CLASS_AND_ME, { variables: { id } });
  if (!loading) {
    console.log(data);
  }
  return (
    <Container>
      <List>
        {loading ? (
          <Loading />
        ) : (
          data.seeClass.students.map((student) => (
            <Item key={student.id}>{student.username}</Item>
          ))
        )}
      </List>
    </Container>
  );
};
