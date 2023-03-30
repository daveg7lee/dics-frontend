import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Table,
  ModalHeader,
  Avatar,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { purgeAllUsers } from "../../apollo";

const DELETE_SCORE = gql`
  mutation deleteScore($id: String!) {
    deleteScore(id: $id) {
      success
      error
      score {
        id
      }
    }
  }
`;

const DELETE_SCORE_BY_USER = gql`
  mutation deleteScoreByUser($username: String!) {
    deleteScoreByUser(username: $username) {
      success
      error
    }
  }
`;

const SearchTable = ({ user, totalScore, totalMerit, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteScoreMutation] = useMutation(DELETE_SCORE);
  const [deleteScoreByUserMutation] = useMutation(DELETE_SCORE_BY_USER);

  const deleteScore = async (e) => {
    e.preventDefault();
    if (!confirm("진짜 지울거야¿ 진짜로¿ 진짜¿ by 가은")) {
      alert("좋은 선택이야!, by 가은");
      return;
    }
    if (!confirm("후회 안 해¿ by 가은")) {
      alert("좋은 선택이야!, by 가은");
      return;
    }

    try {
      const id = e.target.id;
      const { data: deleteScore } = await deleteScoreMutation({
        variables: { id },
      });

      await purgeAllUsers();

      if (deleteScore) {
        toast.success("Deleted");
        refetch();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteScoreByUser = async (e) => {
    e.preventDefault();
    if (!confirm("진짜 지울거야¿ 진짜로¿ 진짜¿ by 가은")) {
      alert("좋은 선택이야!, by 가은");
      return;
    }
    if (!confirm("후회 안 해¿ by 가은")) {
      alert("좋은 선택이야!, by 가은");
      return;
    }
    if (
      !confirm(
        "벌점을 삭제한 후에는 되돌리기 굉장히 힘들 수 있습니다. 해당 사항을 인지하셨습니까?"
      )
    ) {
      alert("좋은 선택이야!");
      return;
    }

    try {
      const { data: deleteScore } = await deleteScoreByUserMutation({
        variables: {
          username: user.username,
        },
      });

      await purgeAllUsers();

      if (deleteScore) {
        toast.success("Deleted");
        refetch();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Grid key={user.id} templateColumns="repeat(6, 1fr)" py={5}>
      <GridItem
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {user.grade}
      </GridItem>
      <GridItem
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar src={user.avatar} />
      </GridItem>
      <GridItem
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {user.username}
      </GridItem>
      <GridItem
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {totalScore}
      </GridItem>
      <GridItem
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {totalMerit}
      </GridItem>
      <Button onClick={onOpen}>Detail</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {user.username}의 벌점 현황
            <Button colorScheme="red" onClick={deleteScoreByUser}>
              벌점 전체삭제
            </Button>
          </ModalHeader>
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Score</Th>
                    <Th>Article</Th>
                    <Th>Date</Th>
                    <Th>Uploader</Th>
                    <Th>Detail</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {user.scores.map((score) => (
                    <Tr key={score.id}>
                      <Td>
                        {score.type === "Demerit"
                          ? score.score * -1
                          : score.score}
                      </Td>
                      <Td>{score.article}</Td>
                      <Td>
                        {score.date.replace(/T.*/, "").split("-").join("-")}
                      </Td>
                      <Td>{score.uploader}</Td>
                      <Td>{score.detail}</Td>
                      <Td onClick={deleteScore}>
                        <Button id={score.id}>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default SearchTable;
