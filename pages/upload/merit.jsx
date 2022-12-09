import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { SEARCH_USER_AND_ME } from "../../SharedQueries";
import { useForm } from "react-hook-form";
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
      score {
        id
      }
    }
  }
`;

const Merit = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [UploadScoreMutation] = useMutation(UPLOAD_SCORE);
  const { data, loading, refetch } = useQuery(SEARCH_USER_AND_ME, {
    variables: { username: watch("term") ? watch("term") : "" },
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
        data: {
          createScore: { success },
        },
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
      await purgeAllUsers();
      if (success) {
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
    <AdminOnlyPage>
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        <h1 className="title">상점 입력</h1>
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
                    {data.searchUser.users
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
              placeholder="사유"
              {...register("reason", { required: true })}
            />
            <Input
              my={1}
              placeholder="점수"
              type="number"
              {...register("score", { required: true })}
            />
            <Button w="full" mt={2} type="submit">
              {loadingBtn ? <Spinner /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </AdminOnlyPage>
  );
};

export default Merit;
