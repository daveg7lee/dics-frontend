import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {
  Input,
  Select,
  Text,
  Badge,
  Spinner,
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  Avatar,
  Heading,
  Center,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import gql from "graphql-tag";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

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
        user {
          username
          grade
        }
        reply {
          text
          user {
            username
            avatar
          }
        }
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

const REPLY_TO = gql`
  mutation replyTo($id: String!, $text: String!) {
    replyTo(replySuggestInput: { id: $id, text: $text }) {
      success
      suggest {
        id
        title
        text
        type
        status
        user {
          username
          grade
        }
        reply {
          text
          user {
            username
            avatar
          }
        }
      }
    }
  }
`;

const Suggest = () => {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [html, setHtml] = useState("");
  const [value, setValue] = useState("");
  const { register, handleSubmit, setError, formState } = useForm();
  const { data, loading } = useQuery(FIND_MY_SUGGESTS);
  const [createSuggestMutation] = useMutation(CREATE_SUGGEST);
  const [replyToMutation] = useMutation(REPLY_TO);

  const handleChange = (event) => setValue(event.target.value);

  const handleReplyClick = async (suggest) => {
    setValue("");
    await replyToMutation({
      variables: { id: suggest.id, text: value },
    });
  };

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
    <Box w="full" py={28} px={{ lg: 32, md: 24, sm: 8 }}>
      <Heading mb={2} fontSize="3xl">
        내 건의
      </Heading>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Box>
          {data.findMySuggests.suggests.map((suggest) => (
            <Box
              key={suggest.id}
              p={5}
              border="1px"
              borderColor="gray.200"
              rounded="lg"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>{suggest.title}</Text>
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
                <Text>{suggest.type}</Text>
              </Box>
              {suggest?.reply && (
                <Box py={5}>
                  {suggest?.reply.map((i) => (
                    <Box display="flex" alignItems="center" key={i.id} py={1}>
                      <Avatar
                        name={i.user.username}
                        src={i.user.avatar}
                        size="sm"
                        mr={2}
                      />
                      <Text as="p" display="flex" alignItems="center">
                        {i.text}
                        <Text color="gray" fontSize="xs" ml={1}>
                          {i.user.username}
                        </Text>
                      </Text>
                    </Box>
                  ))}
                </Box>
              )}
              <InputGroup mt={2}>
                <Input
                  value={value}
                  onChange={handleChange}
                  placeholder="답변을 적어주세요."
                />
                <InputRightElement>
                  <IconButton
                    size="sm"
                    onClick={() => handleReplyClick(suggest)}
                    icon={<FiSend />}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          ))}
        </Box>
      )}
      <Heading mb={2} mt={6} fontSize="3xl">
        건의하기
      </Heading>
      <Text mb={1} color="gray" fontSize="sm">
        한 번 작성한 건의는 수정, 삭제, 보기가 불가능하니 신중하게 작성해주세요!
      </Text>
      <Text mb={4} color="gray" fontSize="sm">
        건의는 1주일에 한 번밖에 할 수 없어요. 매주 학생회 및 사생회가 학생들의
        건의 내용을 살펴볼거에요!
      </Text>
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
          borderColor={
            formState?.errors?.type?.message ? "red.300" : "gray.200"
          }
          {...register("type", { required: "분류를 선택하세요" })}
        >
          <option value="School">학교</option>
          <option value="Dorm">기숙사</option>
          <option value="Other">그 외</option>
        </Select>
        <Text fontSize="md" mb={2}>
          건의사항
        </Text>
        <Box w="full" border="1px" borderColor="gray.200" rounded="lg">
          <ReactQuill
            style={{ height: "400px", backgroundColor: "" }}
            theme="bubble"
            value={html || ""}
            onChange={(content, delta, source, editor) =>
              setHtml(editor.getHTML())
            }
          />
        </Box>
        <Button mt={4} w="full" type="submit">
          {loadingBtn ? <Spinner /> : "건의하기"}
        </Button>
      </form>
    </Box>
  );
};

export default Suggest;
