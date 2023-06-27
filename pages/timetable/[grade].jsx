import { useQuery, gql } from "@apollo/client";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Seo from "../../components/SEO";

const SEE_TIMETABLES = gql`
  query timetable($grade: GradeType!) {
    timetable(grade: $grade) {
      success
      timetables {
        title
        day
        timeTables {
          startTime
          endTime
          subject {
            subject
          }
        }
      }
    }
  }
`;

const GradeTimeTable = () => {
  const router = useRouter();
  const { data, loading } = useQuery(SEE_TIMETABLES, {
    variables: { grade: router.query.grade ? router.query.grade : "G11" },
  });

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      pt={16}
      w="full"
      h="full"
      px={{ lg: 32, md: 24, sm: 8 }}
    >
      <Seo
        title={`${router.query.grade || ""} Timetable`}
        description="DICS 학생들의 시간표를 확인할 수 있는 페이지"
        keywords="DICS 시간표, DICS"
      />
      <Text
        mb={10}
        textAlign="start"
        w="full"
        fontSize="2xl"
        fontWeight="semibold"
      >
        {router.query.grade} 시간표
      </Text>
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
        {data?.timetable?.timetables?.map((timetable, index) => (
          <Box key={index}>
            <Text mb={2} textAlign="center" fontSize="md" fontWeight="semibold">
              {timetable.day}
            </Text>
            {timetable.timeTables.map((time, index) => (
              <Box key={index} p={2}>
                <Text textAlign="center">
                  {time.startTime} ~ {time.endTime}
                </Text>
                <Text textAlign="center">{time?.subject?.subject}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default GradeTimeTable;
