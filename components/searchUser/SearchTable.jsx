import {
  Button,
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

const SearchTable = ({ user, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteScoreMutation] = useMutation(DELETE_SCORE);
  const [deleteScoreByUserMutation] = useMutation(DELETE_SCORE_BY_USER);

  const deleteScore = async (e) => {
    e.preventDefault();
    if (!confirm("진짜 지울거야¿ 진짜로¿ 진짜¿")) {
      alert("좋은 선택이야!");
      return;
    }
    if (!confirm("후회 안 해¿")) {
      alert("좋은 선택이야!");
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
    if (!confirm("진짜 지울거야¿ 진짜로¿ 진짜¿")) {
      alert("좋은 선택이야!");
      return;
    }
    if (!confirm("후회 안 해¿")) {
      alert("좋은 선택이야!");
      return;
    }
    if (
      !confirm(
        "벌점을 삭제후 7일 뒤에는 되돌릴 수 없습니다. 해당 사항을 인지하셨습니까?"
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
    <>
      <Tr key={user.id}>
        <Td>{user.grade}</Td>
        <Td>
          <Avatar src={user.avatar} />
        </Td>
        <Td>{user.username}</Td>
        <Td>{user.fullScores}</Td>
        <Td>{user.fullMerit}</Td>
        <Td>{user.fullScores + user.fullMerit}</Td>
        <Td>{user.totalScores}</Td>
        <Td>{user.totalMerit}</Td>
        <Td>{user.totalScores + user.totalMerit}</Td>
        <Td>{user.attendance ? "✅" : "❌"}</Td>
        <Td>
          <Button onClick={onOpen}>Detail</Button>
        </Td>
      </Tr>
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
    </>
  );
};

export default SearchTable;
