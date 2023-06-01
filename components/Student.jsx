import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

function Student({ me }) {
  return (
    <Box
      w="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={20}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="full"
        mb={20}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading fontSize={{ base: "9xl", md: "12rem" }}>
            {me?.fullScores}
          </Heading>
          <Text fontSize="xl">이번학기 벌점</Text>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading fontSize={{ base: "9xl", md: "12rem" }}>
            {me?.fullMerit}
          </Heading>
          <Text fontSize="xl">이번학기 상점</Text>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading fontSize={{ base: "9xl", md: "12rem" }}>
            {me?.totalScores}
          </Heading>
          <Text fontSize="xl">이번달 벌점</Text>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading fontSize={{ base: "9xl", md: "12rem" }}>
            {me?.totalMerit}
          </Heading>
          <Text fontSize="xl">이번달 상점</Text>
        </Box>
      </Box>
      <Grid templateColumns={"repeat(2, 1fr)"} w="full" gap={5}>
        {me?.scores.map((score) => (
          <GridItem
            key={score.id}
            bgColor={score.type === "Demerit" ? "red.400" : "green.400"}
            cursor="pointer"
            p={8}
            rounded="lg"
            w="full"
          >
            <Text color="white">
              {score.type === "Demerit" ? "벌점" : "상점"} {score.score}점
            </Text>
            <Text color="white">{score.article}</Text>
            <Box
              display="flex"
              justifyContent="spaceBetween"
              alignItems="center"
            >
              <Text color="white" mr={1}>
                {score.date.replace(/T.*/, "").split("-").join(".")}
              </Text>
              <Text color="white">{score.uploader}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Student;
