import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import AdminOnlyPage from "../../components/ProtectedPages/AdminOnlyPage";

const Upload = () => {
  return (
    <AdminOnlyPage>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        h="100vh"
        pt={20}
      >
        <Link href="/upload/merit">
          <Heading fontSize="3xl">상점 입력</Heading>
        </Link>
        <Link href="/upload/demerit">
          <Heading fontSize="3xl">벌점 입력</Heading>
        </Link>
      </Box>
    </AdminOnlyPage>
  );
};

export default Upload;
