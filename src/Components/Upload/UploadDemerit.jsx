import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loader from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UPLOAD_SCORE = gql`
  mutation UploadScore(
    $score: Int!
    $article: String!
    $username: String!
    $type: String!
    $date: String!
    $uploader: String!
    $detail: String
  ) {
    UploadScore(
      score: $score
      article: $article
      username: $username
      type: $type
      date: $date
      uploader: $uploader
      detail: $detail
    )
  }
`;

const SEARCH_USER_AND_ME = gql`
  query searchUserAndMe($term: String!) {
    searchUser(term: $term) {
      id
      username
      avatar
      type
      scores {
        score
        article
        date
        type
        uploader
      }
    }
    me {
      username
      avatar
      type
      email
      scores {
        score
        article
        date
        type
        uploader
      }
    }
  }
`;

export default () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [UploadScoreMutation] = useMutation(UPLOAD_SCORE);
  const { data, loading, refetch } = useQuery(SEARCH_USER_AND_ME, {
    variables: { term: watch("term") },
  });

  const onSubmit = async ({ score, article, term, date, uploader, detail }) => {
    try {
      const {
        data: { UploadScore },
      } = await UploadScoreMutation({
        variables: {
          score: +score,
          article,
          username: term,
          type: "Demerit",
          date,
          uploader,
          detail,
        },
      });
      if (UploadScore) {
        toast.success("입력이 완료되었습니다!");
      }
    } catch (e) {
      const errorMessage = e.message
        .replace("GraphQL", "")
        .replace("error", "")
        .replace(":", "");
      toast.error(errorMessage);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="container px-40">
      <h1 className="title">벌점 입력</h1>
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            placeholder="입력자"
            {...register("uploader", { required: true })}
          />
          <input
            className="input"
            placeholder="Date"
            type="datetime-local"
            {...register("date", { required: true })}
          />
          <input
            className="input"
            placeholder="받는사람"
            {...register("term", { required: true })}
            onKeyPress={() => refetch()}
          />
          {data?.searchUser?.length !== 0 && (
            <div className="labelContainer">
              {loading ? (
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={20}
                  width={20}
                  timeout={5000}
                />
              ) : (
                <>
                  {data?.searchUser?.length !== 0
                    ? data.searchUser.map((user) => (
                        <label className="label" key={user.id}>
                          <input
                            key={user.id}
                            type="radio"
                            name="Student"
                            value={user.username}
                            style={{ width: "1rem" }}
                            onClick={() => setValue("term", user.username)}
                          />
                          {user.username}
                        </label>
                      ))
                    : term.value !== "" && <h1>User not Found</h1>}
                </>
              )}
            </div>
          )}
          <input
            className="input"
            placeholder="솔로몬 조항"
            {...register("article", { required: true })}
          />
          <input
            className="input"
            placeholder="점수"
            {...register("score", { required: true })}
            type="number"
          />
          <input
            className="input"
            placeholder="비고"
            {...register("detail", { required: false })}
            type="text"
          />
          {loadingBtn ? (
            <button className="blueButton">
              <Loader
                type="TailSpin"
                color="white"
                height={16}
                width={16}
                timeout={5000}
              />
            </button>
          ) : (
            <button className="blueButton">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};
