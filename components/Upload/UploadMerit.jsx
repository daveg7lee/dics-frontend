import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";
import { SEARCH_USER_AND_ME } from "../../SharedQueries";
import { useForm } from "react-hook-form";

const UPLOAD_SCORE = gql`
  mutation createScore(
    $score: Int!
    $article: String!
    $username: String!
    $type: ScoreType!
    $date: String!
    $uploader: String!
  ) {
    createScore(
      createScoreInput: {
        score: $score
        article: $article
        username: $username
        type: $type
        date: $date
        uploader: $uploader
      }
    ) {
      success
      error
    }
  }
`;

const UploadMerit = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [UploadScoreMutation] = useMutation(UPLOAD_SCORE);
  const { data, loading, refetch } = useQuery(SEARCH_USER_AND_ME, {
    variables: { username: watch("term") },
  });

  const onSubmit = async ({ uploader, term, reason, score, date }) => {
    try {
      setLoadingBtn(true);
      if (!loading) {
        if (data.me.type !== "Admin") {
          throw Error("You Can't");
        }
      }
      const {
        data: { UploadScore },
      } = await UploadScoreMutation({
        variables: {
          score: +score,
          article: reason,
          username: term,
          type: "Merit",
          date,
          uploader,
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
      <h1 className="title">상점 입력</h1>
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
          {loading && (
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
                  {data.success
                    ? data.searchUser.users.map((user) => (
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
            placeholder="사유"
            {...register("reason", { required: true })}
          />
          <input
            className="input"
            placeholder="점수"
            type="number"
            {...register("score", { required: true })}
          />
          {loadingBtn ? (
            <CustomButton
              text={
                <Loader
                  type="TailSpin"
                  color="white"
                  height={16}
                  width={16}
                  timeout={5000}
                />
              }
            />
          ) : (
            <CustomButton text="Submit" />
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadMerit;
