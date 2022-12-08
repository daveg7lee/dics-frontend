import { Loading } from "@nextui-org/react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {
  Input,
  Select,
  TableContainer,
  Text,
  Table,
  Tfoot,
  Tr,
  Th,
  Td,
  Thead,
  TableCaption,
  Tbody,
  Badge,
  Spinner,
} from "@chakra-ui/react";
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
  const [html, setHtml] = useState("");
  const { register, handleSubmit, setError, formState } = useForm();
  const { data, loading } = useQuery(FIND_MY_SUGGESTS);
  const [createSuggestMutation] = useMutation(CREATE_SUGGEST);

  const onValid = async ({ title, type }) => {
    try {
      setLoadingBtn(true);

      if (html === "") {
        setError("result", { message: "건의사항을 자세히 적어주세요!" });
      }

      const {
        data: {
          createSuggest: { success, error },
        },
      } = await createSuggestMutation({
        variables: { title, text: html, type },
      });

      if (success) {
        toast.success("건의가 제출되었습니다.");
        router.reload();
      } else {
        toast.error(error);
      }
    } catch (e) {
      const errorMessage = e.message;
      toast.error(errorMessage);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-28 layout">
      <h1 className="text-2xl font-bold mb-3">내 건의</h1>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>제목</Th>
                <Th>상태</Th>
                <Th>분류</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.findMySuggests.suggests.map((suggest) => (
                <Tr key={suggest.id}>
                  <Td>
                    <span className="text-black dark:text-white">
                      {suggest.title}
                    </span>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        suggest.status === "done"
                          ? "green"
                          : suggest.status === "decline"
                          ? "red"
                          : suggest.status === "processing"
                          ? "yellow"
                          : "gray"
                      }
                    >
                      {suggest.status}
                    </Badge>
                  </Td>
                  <Td>
                    <span className="text-black dark:text-white">
                      {suggest.type}
                    </span>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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
        <Text fontSize="md" mb={2}>
          제목
        </Text>
        <Input
          mb={4}
          isInvalid={formState?.errors?.title?.message}
          errorBorderColor="red.300"
          placeholder="제목"
          {...register("title", { required: "제목을 입력하세요" })}
        />
        <Text fontSize="md" mb={2}>
          분류
        </Text>
        <Select
          mb={4}
          placeholder="분류"
          borderColor={formState?.errors?.type?.message ? "red.300" : "white"}
          {...register("type", { required: "분류를 선택하세요" })}
        >
          <option value="School">학교</option>
          <option value="Dorm">기숙사</option>
          <option value="Other">그 외</option>
        </Select>
        <Text fontSize="md" mb={2}>
          건의사항
        </Text>
        <div className="w-full border-borderColor rounded bg-bgColor dark:bg-slate-800 border">
          <ReactQuill
            style={{ height: "400px" }}
            theme="bubble"
            value={html || ""}
            onChange={(content, delta, source, editor) =>
              setHtml(editor.getHTML())
            }
          />
          <p>{formState?.errors?.html?.message}</p>
        </div>
        <button className="blueButton mt-4" type="submit">
          {loadingBtn ? <Loading type="spinner" size="sm" /> : "건의하기"}
        </button>
      </form>
    </div>
  );
};

export default Suggest;
