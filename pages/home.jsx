import useUser from "../hooks/useUser";
import Admin from "../components/Admin";
import Student from "../components/Student";
import { Box, Spinner } from "@chakra-ui/react";

function Home() {
  const { data } = useUser();
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt={16}
    >
      {!data?.me ? (
        <Spinner />
      ) : (
        <Box w="full" h="full" px={{ lg: 32, md: 24, sm: 8 }}>
          {data?.me?.type === "Admin" ? <Admin /> : <Student me={data?.me} />}
        </Box>
      )}
    </Box>
  );
}

export default Home;
