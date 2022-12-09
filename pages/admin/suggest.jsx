import { Loading } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import SuggestItem from "../../components/admin/suggest/SuggetItem";

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
        reply {
          text
          user {
            username
            avatar
          }
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
        reply {
          text
          user {
            username
            avatar
          }
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
        reply {
          text
          user {
            username
            avatar
          }
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

const SuggestAdmin = () => {
  const { data, loading } = useQuery(SUGGESTS);

  return (
    <div className="w-full min-h-screen py-28 layout">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl mb-4 font-bold">대기 중인 건의사항</h1>
          <ul>
            {data?.findAllWaiting?.suggests.map((suggest) => (
              <SuggestItem
                key={suggest.id}
                suggest={suggest}
                leftButtonType={{ status: "processing", text: "진행" }}
                rightButtonType={{ status: "decline", text: "거절" }}
              />
            ))}
          </ul>

          <h1 className="text-2xl font-bold my-4">진행 중인 건의사항</h1>
          <ul>
            {data?.findAllProcessing?.suggests.map((suggest) => (
              <SuggestItem
                key={suggest.id}
                suggest={suggest}
                leftButtonType={{ status: "done", text: "완료" }}
                rightButtonType={{ status: "waiting", text: "보류" }}
              />
            ))}
          </ul>
          <h1 className="text-2xl font-bold my-4">완료된 건의사항</h1>
          <ul className="done">
            {data?.findAllDone?.suggests.map((suggest) => (
              <SuggestItem
                key={suggest.id}
                suggest={suggest}
                leftButtonType={{ status: "processing", text: "재진행" }}
                rightButtonType={{ status: "decline", text: "거절" }}
              />
            ))}
          </ul>
          <h1 className="text-2xl font-bold my-4">거절된 건의사항</h1>
          <ul className="done">
            {data?.findAllDecline?.suggests.map((suggest) => (
              <SuggestItem
                key={suggest.id}
                suggest={suggest}
                leftButtonType={{ status: "waiting", text: "재확인" }}
                rightButtonType={{ status: "processing", text: "진행" }}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SuggestAdmin;
