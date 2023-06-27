import useUser from "../hooks/useUser";
import Admin from "../components/Admin";
import Student from "../components/Student";
import { Box, Spinner } from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPages/ProtectedPage";
import Seo from "../components/SEO";

function Home() {
  const { data } = useUser();
  return (
    <ProtectedPage>
      <Seo
        title="Home"
        description="학생들이 자신들의 상벌점을 확인할 수 있는 홈 화면"
        keywords="DICS 벌점, DICS 학생 관리, DICS, DICS 상점"
      />
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
    </ProtectedPage>
  );
}

export default Home;
