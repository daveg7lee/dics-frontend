import { Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

const SUGGESTS = gql`
  query {
    findAllWaiting {
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
      }
    }
    findAllDone {
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
      }
    }
    findAllProcessing {
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
      }
    }
    findAllDecline {
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
      }
    }
  }
`;

const UPDATE_SUGGEST = gql`
  mutation updateSuggest($id: String!, $status: SuggestStatus!) {
    updateSuggest(updateSuggestInput: { id: $id, status: $status }) {
      success
      error
    }
  }
`;

const SuggestAdmin = () => {
  const router = useRouter();
  const { data, loading } = useQuery(SUGGESTS);
  const [updateSuggestMutation] = useMutation(UPDATE_SUGGEST);

  const onClick = async (id, status) => {
    await updateSuggestMutation({
      variables: {
        id,
        status,
      },
    });

    router.reload();
  };

  return (
    <div className="w-full min-h-screen py-28 layout">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl mb-4 font-bold">대기 중인 건의사항</h1>
          <ul>
            {data?.findAllWaiting?.suggests.map((suggest) => (
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
                        await onClick(suggest.id, "processing")
                      }
                    >
                      진행
                    </button>
                    <button
                      onClick={async () => await onClick(suggest.id, "decline")}
                    >
                      거절
                    </button>
                  </div>
                </div>
                <details>
                  <summary>건의 사항</summary>
                  <p>{suggest.text}</p>
                </details>
              </div>
            ))}
          </ul>

          <h1 className="text-2xl font-bold my-4">진행 중인 건의사항</h1>
          <ul>
            {data?.findAllProcessing?.suggests.map((suggest) => (
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
                      onClick={async () => await onClick(suggest.id, "done")}
                    >
                      완료
                    </button>
                    <button
                      onClick={async () => await onClick(suggest.id, "waiting")}
                    >
                      보류
                    </button>
                  </div>
                </div>
                <details>
                  <summary>건의 사항</summary>
                  <p>{suggest.text}</p>
                </details>
              </div>
            ))}
          </ul>
          <h1 className="text-2xl font-bold my-4">완료된 건의사항</h1>
          <ul className="done">
            {data?.findAllDone?.suggests.map((suggest) => (
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
                        await onClick(suggest.id, "processing")
                      }
                    >
                      재진행
                    </button>
                    <button
                      onClick={async () => await onClick(suggest.id, "decline")}
                    >
                      거절
                    </button>
                  </div>
                </div>
                <details>
                  <summary>건의 사항</summary>
                  <p>{suggest.text}</p>
                </details>
              </div>
            ))}
          </ul>
          <h1 className="text-2xl font-bold my-4">거절된 건의사항</h1>
          <ul className="done">
            {data?.findAllDecline?.suggests.map((suggest) => (
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
                      onClick={async () => await onClick(suggest.id, "waiting")}
                    >
                      재확인
                    </button>
                    <button
                      onClick={async () =>
                        await onClick(suggest.id, "processing")
                      }
                    >
                      진행
                    </button>
                  </div>
                </div>
                <details>
                  <summary>건의 사항</summary>
                  <p>{suggest.text}</p>
                </details>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SuggestAdmin;
