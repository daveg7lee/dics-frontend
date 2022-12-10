import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { purgeAllUsers } from "../apollo";
import { Box, Grid, Text } from "@chakra-ui/react";

const RESET_SCORE = gql`
  mutation resetScores($type: ScoreType!) {
    resetScores(type: $type) {
      success
      error
    }
  }
`;

const GRADUATE = gql`
  mutation graduate {
    graduate {
      success
      error
    }
  }
`;

const Admin = () => {
  const [resetScoresMutation] = useMutation(RESET_SCORE);
  const [graduateMutation] = useMutation(GRADUATE);

  const resetScores = async (type) => {
    alert(
      "한번 점수를 초기화하면 다시 되돌릴 수 없습니다. 정말 초기화 하시겠습니까?"
    );
    const ok = prompt("'삭제'를 입력해주세요", "");
    if (ok === "삭제") {
      const {
        data: {
          resetScores: { success },
        },
      } = await resetScoresMutation({ variables: { type } });
      await purgeAllUsers();
      if (success) {
        toast.success("모든 점수가 초기화되었습니다.");
      } else {
        toast.error(
          "점수 초기화에 실패하였습니다. 잠시후 다시 시도하거나 관리자에게 문의해주시길 바랍니다."
        );
      }
    }
  };

  const onClickGraduate = async () => {
    alert(
      "정말로 모든 학생들의 학년을 변경하시겠습니까? 참고로 이 작업은 절대 되돌릴 수 없습니다."
    );
    const ok = prompt("'변경'를 입력해주세요", "");
    if (ok === "변경") {
      const {
        data: {
          graduate: { success },
        },
      } = await graduateMutation();
      await purgeAllUsers();
      if (success) {
        toast.success("모든 학년이 변경되었습니다.");
      } else {
        toast.error(
          "졸업에 실패하였습니다. 잠시후 다시 시도하거나 관리자에게 문의해주시길 바랍니다."
        );
      }
    }
  };

  return (
    <Grid
      w="full"
      h="full"
      templateColumns={{
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={4}
    >
      <Link href="/upload">
        <Box
          w="full"
          border="1px"
          borderColor="gray.200"
          p={5}
          textAlign="center"
        >
          <Text fontSize="2xl" as="b" w="full">
            상벌점 입력
          </Text>
        </Box>
      </Link>
      <Link href="/searchUser">
        <Box
          w="full"
          border="1px"
          borderColor="gray.200"
          p={5}
          textAlign="center"
        >
          <Text fontSize="2xl" as="b" w="full">
            학생 조회
          </Text>
        </Box>
      </Link>
      <Link href="/signup">
        <Box
          w="full"
          border="1px"
          borderColor="gray.200"
          p={5}
          textAlign="center"
        >
          <Text fontSize="2xl" as="b" w="full">
            학생 추가
          </Text>
        </Box>
      </Link>
      <Link href="/deleteUser">
        <Box
          w="full"
          border="1px"
          borderColor="gray.200"
          p={5}
          textAlign="center"
        >
          <Text fontSize="2xl" as="b" w="full">
            학생 제거
          </Text>
        </Box>
      </Link>
      <Link href="/searchScore">
        <Box
          w="full"
          border="1px"
          borderColor="gray.200"
          p={5}
          textAlign="center"
        >
          <Text fontSize="2xl" as="b" w="full">
            상벌점 조회
          </Text>
        </Box>
      </Link>
      <Box
        w="full"
        border="1px"
        borderColor="gray.200"
        p={5}
        textAlign="center"
        onClick={() => resetScores("Demerit")}
      >
        <Text fontSize="2xl" as="b" w="full">
          벌점 초기화
        </Text>
      </Box>
      <Box
        w="full"
        border="1px"
        borderColor="gray.200"
        p={5}
        textAlign="center"
        onClick={() => resetScores("Merit")}
      >
        <Text fontSize="2xl" as="b" w="full">
          상점 초기화
        </Text>
      </Box>
      <Box
        w="full"
        border="1px"
        borderColor="gray.200"
        p={5}
        textAlign="center"
        onClick={onClickGraduate}
      >
        <Text fontSize="2xl" as="b" w="full">
          졸업
        </Text>
      </Box>
      <Link href="/admin/suggest">
        <Box
          w="full"
          border="1px"
          borderColor="gray.200"
          p={5}
          textAlign="center"
        >
          <Text fontSize="2xl" as="b" w="full">
            소리함 관리
          </Text>
        </Box>
      </Link>
    </Grid>
  );
};

export default Admin;
