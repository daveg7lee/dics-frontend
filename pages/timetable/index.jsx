import { Box, Button, Grid, Link, Text } from "@chakra-ui/react";

const TimeTable = () => {
  const grades = ["G7", "G8", "G9", "G10", "G11", "G12"];

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt={16}
      w="full"
      h="full"
      px={{ lg: 32, md: 24, sm: 8 }}
    >
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
        {grades.map((grade) => (
          <Link key={grade} href={`/timetable/${grade}`}>
            <Box
              w="full"
              border="1px"
              borderColor="gray.200"
              p={5}
              textAlign="center"
            >
              <Text fontSize="2xl" as="b" w="full">
                {grade} 시간표
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default TimeTable;
