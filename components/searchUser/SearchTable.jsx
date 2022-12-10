import Image from "next/image";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
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

const SearchTable = ({ user, totalScore, deleteScore, totalMerit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <ModalHeader>{user.username}의 벌점 현황</ModalHeader>
          <ModalCloseButton />
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
