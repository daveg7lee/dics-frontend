import { Center, Heading } from "@chakra-ui/react";

export default function PageNotFound() {
  return (
    <Center h="100vh" display="flex" flexDirection="column">
      <Heading fontSize="9xl">404</Heading>
      <Heading fontSize="3xl">요청하신 페이지를 찾을 수 없습니다.</Heading>
    </Center>
  );
}
