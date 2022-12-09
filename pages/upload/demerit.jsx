import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SEARCH_USER_AND_ME } from "../../SharedQueries";
import { purgeAllUsers } from "../../apollo";
import { Button, Input, Spinner } from "@chakra-ui/react";
import AdminOnlyPage from "../../components/ProtectedPages/AdminOnlyPage";

const UPLOAD_SCORE = gql`
  mutation createScore(
    $score: Int!
    $article: String!
    $username: String!
    $type: ScoreType!
    $date: String!
    $uploader: String!
    $detail: String
  ) {
    createScore(
      createScoreInput: {
        score: $score
        article: $article
        username: $username
        type: $type
        date: $date
        uploader: $uploader
        detail: $detail
      }
    ) {
      success
      error
      score {
        id
      }
    }
  }
`;

const UPLOAD_SCORE_BY_GRADE = gql`
  mutation createScoreByGrade(
    $score: Int!
    $article: String!
    $grade: GradeType!
    $type: ScoreType!
    $date: String!
    $uploader: String!
    $detail: String
  ) {
    createScoreByGrade(
      createScoreInput: {
        score: $score
        article: $article
        grade: $grade
        type: $type
        date: $date
        uploader: $uploader
        detail: $detail
      }
    ) {
      success
      error
    }
  }
`;

const Demerit = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [UploadScoreMutation] = useMutation(UPLOAD_SCORE);
  const [UploadScoreByGradeMutation] = useMutation(UPLOAD_SCORE_BY_GRADE);
  const { data, loading, refetch } = useQuery(SEARCH_USER_AND_ME, {
    variables: { username: watch("term") ? watch("term") : "" },
  });

  const onSubmit = async ({ score, article, term, date, uploader, detail }) => {
    try {
      setLoadingBtn(true);
      if (term.includes("G")) {
        const {
          data: {
            createScoreByGrade: { success },
          },
        } = await UploadScoreByGradeMutation({
          variables: {
            score: +score,
            article,
            grade: term,
            type: "Demerit",
            date,
            uploader,
            detail,
          },
        });

        await purgeAllUsers();

        if (success) {
          toast.success("입력이 완료되었습니다!");
        }
      } else {
        const {
          data: {
            createScore: { success },
          },
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

        await purgeAllUsers();
        if (success) {
          toast.success("입력이 완료되었습니다!");
        }
      }
    } catch (e) {
      const errorMessage = e.message;
      toast.error(errorMessage);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <AdminOnlyPage>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center">
        <h1 className="title">벌점 입력</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              my={1}
              placeholder="입력자"
              {...register("uploader", { required: true })}
            />
            <Input
              my={1}
              placeholder="Date"
              type="datetime-local"
              {...register("date", { required: true })}
            />
            <Input
              my={1}
              placeholder="받는사람"
              {...register("term", { required: true })}
              onKeyPress={() => refetch()}
            />
            {
              <div className="labelContainer">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {data.searchUser.success
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
            }
            <Input
              my={1}
              placeholder="솔로몬 조항"
              {...register("article", { required: true })}
            />
            <Input
              my={1}
              placeholder="점수"
              {...register("score", { required: true })}
              type="number"
            />
            <Input
              my={1}
              placeholder="비고"
              {...register("detail", { required: false })}
              type="text"
            />
            <Button disabled={loadingBtn} w={"full"} mt={2} type="submit">
              {loadingBtn ? <Spinner /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </AdminOnlyPage>
  );
};

export default Demerit;
