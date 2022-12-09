import { useMutation, gql } from "@apollo/client";
import {
  Avatar,
  Box,
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
  const updateReplyTo = (cache, result) => {
    const {
      data: { replyTo },
    } = result;
    switch (suggest.status) {
      case "waiting":
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            findAllWaiting(prev) {
              return {
                success: true,
                suggests: [
                  ...prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                  replyTo.suggest,
                ],
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
                suggests: [
                  ...prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                  replyTo.suggest,
                ],
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
                suggests: [
                  ...prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                  replyTo.suggest,
                ],
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
                suggests: [
                  ...prev.suggests.filter((i) => {
                    if (i.__ref) {
                      return i.__ref.split(":")[1] !== suggest.id;
                    } else {
                      return i.id !== suggest.id;
                    }
                  }),
                  replyTo.suggest,
                ],
              };
            },
          },
        });
        break;
    }
  };
  const [replyToMutation] = useMutation(REPLY_TO, { update: updateReplyTo });

  const onClick = async (id, status) => {
    setValue("");
    await updateSuggestMutation({
      variables: {
        id,
        status,
      },
    });
  };

  const handleReplyClick = async () => {
    const res = await replyToMutation({
      variables: { id: suggest.id, text: value },
    });
    console.log(res);
  };

  return (
    <div
      className="p-4 border-borderColor border dark:border-slate-600 rounded"
      key={suggest.id}
    >
      <span>{suggest.user.grade + " " + suggest.user.username}</span>
      <div className="flex justify-between items-center w-full">
        <h1>{suggest.title}</h1>
        <div>
          <button
            className="mr-2"
            onClick={async () =>
              await onClick(suggest.id, leftButtonType.status)
            }
          >
            {leftButtonType.text}
          </button>
          <button
            onClick={async () =>
              await onClick(suggest.id, rightButtonType.status)
            }
          >
            {rightButtonType.text}
          </button>
        </div>
      </div>
      <details>
        <summary>건의 사항</summary>
        <ReactQuill value={suggest.text} readOnly={true} theme={"bubble"} />
      </details>
      {suggest?.reply && (
        <Box as="details">
          <summary>채팅</summary>
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
          <IconButton size="sm" onClick={handleReplyClick} icon={<FiSend />} />
        </InputRightElement>
      </InputGroup>
    </div>
  );
}

export default SuggestItem;
