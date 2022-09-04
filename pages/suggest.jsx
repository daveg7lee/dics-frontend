import { Table, Loading } from "@nextui-org/react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import { useState } from "react";
import { StyledBadge } from "../components/StyledBadge";

const FIND_MY_SUGGESTS = gql`
  query findMySuggests {
    findMySuggests {
      success
      suggests {
        id
        title
        text
        type
        status
        createdAt
      }
    }
  }
`;

const CREATE_SUGGEST = gql`
  mutation createSuggest($title: String!, $text: String!, $type: SuggestType!) {
    createSuggest(
      createSuggestInput: { title: $title, text: $text, type: $type }
    ) {
      success
      error
    }
  }
`;

const Suggest = () => {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { register, handleSubmit } = useForm();
  const { data, loading } = useQuery(FIND_MY_SUGGESTS);
  const [createSuggestMutation] = useMutation(CREATE_SUGGEST);

  const onValid = async ({ title, text, type }) => {
    try {
      setLoadingBtn(true);
      const {
        data: {
          createSuggest: { success, error },
        },
      } = await createSuggestMutation({ variables: { title, text, type } });

      if (success) {
        toast.success("건의가 제출되었습니다.");
      } else {
        toast.error(error);
      }
    } catch (e) {
      const errorMessage = e.message;
      toast.error(errorMessage);
    } finally {
      setLoadingBtn(false);
      router.reload();
    }
  };

  return (
    <div className="w-full min-h-screen py-28 layout">
      <h1 className="text-2xl font-bold mb-3">내 건의</h1>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading type="spinner" size="lg" />
        </div>
      ) : (
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>제목</Table.Column>
            <Table.Column>상태</Table.Column>
            <Table.Column>분류</Table.Column>
          </Table.Header>
          <Table.Body items={data.findMySuggests.suggests}>
            {(suggest) => (
              <Table.Row key={suggest.id}>
                <Table.Cell>
                  <span className="text-black dark:text-white">
                    {suggest.title}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <StyledBadge type={suggest.status}>
                    {suggest.status}
                  </StyledBadge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-black dark:text-white">
                    {suggest.type}
                  </span>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
      <h1 className="text-2xl font-bold mb-2 mt-6">건의하기</h1>
      <h3 className="opacity-70 text-sm mb-[2px]">
        한 번 작성한 건의는 수정, 삭제, 보기가 불가능하니 신중하게 작성해주세요!
      </h3>
      <h3 className="opacity-70 text-sm mb-4">
        건의는 1주일에 한 번밖에 할 수 없어요. 매주 학생회 및 사생회가 학생들의
        건의 내용을 살펴볼거에요!
      </h3>
      <form onSubmit={handleSubmit(onValid)}>
        <label>
          제목
          <input
            className="input"
            placeholder="제목을 입력하세요"
            {...register("title", { required: true })}
          />
        </label>
        <label>
          분류
          <select className="select" {...register("type", { required: true })}>
            <option value="School">학교</option>
            <option value="Dorm">기숙사</option>
            <option value="Other">그 외</option>
          </select>
        </label>
        <label>
          건의사항
          <textarea
            className="textarea"
            placeholder="건의하고 싶은 내용을 입력하세요"
            {...register("text", { required: true })}
            rows={20}
          />
        </label>
        <button className="blueButton" type="submit">
          {loadingBtn ? <Loading type="spinner" size="sm" /> : "건의하기"}
        </button>
      </form>
    </div>
  );
};

export default Suggest;
