import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { SEARCH_USER_AND_ME } from "../../SharedQueries";
import { useForm } from "react-hook-form";
import { purgeAllUsers } from "../../apollo";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
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
      <Box
        w="full"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading fontSize="3xl" mb={4}>
          상점 입력
        </Heading>

        <FormControl
          as="form"
          maxW={{ base: "sm", md: "md", lg: "lg" }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {watch("term") && watch("term") !== "" ? (
            <Box py={4}>
              {loading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <>
                  {data.searchUser.success
                    ? data.searchUser.users.map((user) => (
                        <FormLabel
                          key={user.id}
                          w="full"
                          h="full"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          htmlFor="Student"
                        >
                          <input
                            key={user.id}
                            type="radio"
                            name="Student"
                            id="Student"
                            value={user.username}
                            style={{ width: "1rem" }}
                            onClick={() => setValue("term", user.username)}
                          />
                          {user.username}
                        </FormLabel>
                      ))
                    : watch("term") !== "" && <h1>User not Found</h1>}
                </>
              )}
            </Box>
          ) : null}
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
        </FormControl>
      </Box>
    </AdminOnlyPage>
  );
};

export default Merit;
