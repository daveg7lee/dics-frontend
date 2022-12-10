import { useMutation, gql } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UPDATE_SUGGEST = gql`
  mutation updateSuggest($id: String!, $status: SuggestStatus!) {
    updateSuggest(updateSuggestInput: { id: $id, status: $status }) {
      success
      error
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

const REMOVE_SUGGEST = gql`
  mutation removeSuggest($id: String!) {
    removeSuggest(id: $id) {
      success
      error
    }
  }
`;

function SuggestItem({ suggest, leftButtonType, rightButtonType }) {
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  const updateUpdateSuggest = (cache, result) => {
    const {
      data: { updateSuggest },
    } = result;
    if (updateSuggest.suggest.id) {
      switch (suggest.status) {
        case "waiting":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllWaiting(prev) {
                return {
                  success: true,
                  suggests: prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                };
              },
            },
          });
          break;
        case "done":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllDone(prev) {
                return {
                  success: true,
                  suggests: prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                };
              },
            },
          });
          break;
        case "processing":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllProcessing(prev) {
                return {
                  success: true,
                  suggests: prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                };
              },
            },
          });
          break;
        case "decline":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllDecline(prev) {
                return {
                  success: true,
                  suggests: prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                };
              },
            },
          });
          break;
      }
      switch (updateSuggest.suggest.status) {
        case "waiting":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllWaiting(prev) {
                return {
                  success: true,
                  suggests: [updateSuggest.suggest, ...prev.suggests],
                };
              },
            },
          });
          break;
        case "done":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllDone(prev) {
                return {
                  success: true,
                  suggests: [updateSuggest.suggest, ...prev.suggests],
                };
              },
            },
          });
          break;
        case "processing":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllProcessing(prev) {
                return {
                  success: true,
                  suggests: [updateSuggest.suggest, ...prev.suggests],
                };
              },
            },
          });
          break;
        case "decline":
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              findAllDecline(prev) {
                return {
                  success: true,
                  suggests: [updateSuggest.suggest, ...prev.suggests],
                };
              },
            },
          });
          break;
      }
    }
  };
  const [updateSuggestMutation] = useMutation(UPDATE_SUGGEST, {
    update: updateUpdateSuggest,
  });
  const [replyToMutation] = useMutation(REPLY_TO);
  const updateRemoveSuggest = (cache, result) => {
    switch (suggest.status) {
      case "waiting":
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            findAllWaiting(prev) {
              return {
                success: true,
                suggests: prev.suggests.filter((i) => {
                  if (i.__ref) {
                    return i.__ref.split(":")[1] !== suggest.id;
                  } else {
                    return i.id !== suggest.id;
                  }
                }),
              };
            },
          },
        });
        break;
      case "done":
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            findAllDone(prev) {
              return {
                success: true,
                suggests: prev.suggests.filter((i) => {
                  if (i.__ref) {
                    return i.__ref.split(":")[1] !== suggest.id;
                  } else {
                    return i.id !== suggest.id;
                  }
                }),
              };
            },
          },
        });
        break;
      case "processing":
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            findAllProcessing(prev) {
              return {
                success: true,
                suggests: prev.suggests.filter((i) => {
                  if (i.__ref) {
                    return i.__ref.split(":")[1] !== suggest.id;
                  } else {
                    return i.id !== suggest.id;
                  }
                }),
              };
            },
          },
        });
        break;
      case "decline":
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            findAllDecline(prev) {
              return {
                success: true,
                suggests: prev.suggests.filter((i) => {
                  if (i.__ref) {
                    return i.__ref.split(":")[1] !== suggest.id;
                  } else {
                    return i.id !== suggest.id;
                  }
                }),
              };
            },
          },
        });
        break;
    }
  };
  const [removeSuggestMutation] = useMutation(REMOVE_SUGGEST, {
    update: updateRemoveSuggest,
  });

  const onClick = async (id, status) => {
    await updateSuggestMutation({
      variables: {
        id,
        status,
      },
    });
  };

  const handleReplyClick = async () => {
    setValue("");
    await replyToMutation({
      variables: { id: suggest.id, text: value },
    });
  };

  const onClickDelete = async () => {
    if (
      window.confirm(
        "정말로 이 건의를 삭제하시겠습니까? 건의를 삭제하지 않고 거절하여 보류하는 방법도 있습니다."
      )
    ) {
      await removeSuggestMutation({ variables: { id: suggest.id } });
    }
  };

  return (
    <Box
      p={5}
      border="1px"
      borderColor="gray.200"
      rounded="lg"
      key={suggest.id}
    >
      <Box
        display="flex"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text as="b">{suggest.user.grade + " " + suggest.user.username}</Text>
        <Button colorScheme="red" size="sm" onClick={onClickDelete}>
          삭제
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="full"
        pt={2}
      >
        <Heading fontSize="xl">{suggest.title}</Heading>
        <Box>
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={async () =>
              await onClick(suggest.id, leftButtonType.status)
            }
          >
            {leftButtonType.text}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () =>
              await onClick(suggest.id, rightButtonType.status)
            }
          >
            {rightButtonType.text}
          </Button>
        </Box>
      </Box>
      <Heading fontSize="xl" mt={4}>
        건의 사항
      </Heading>
      <ReactQuill value={suggest.text} readOnly={true} theme={"bubble"} />
      <Heading fontSize="xl" mt={4}>
        답변
      </Heading>
      {suggest?.reply && (
        <Box py={4}>
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
      <InputGroup>
        <Input
          value={value}
          onChange={handleChange}
          placeholder="답변을 적어주세요."
        />
        <InputRightElement>
          <IconButton size="sm" onClick={handleReplyClick} icon={<FiSend />} />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default SuggestItem;
