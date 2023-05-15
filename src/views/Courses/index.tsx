import { Flex, Grid, Text, Spinner } from "@chakra-ui/react";

import CourseCard from "@/components/Course/CourseCard";
import useMobile from "@/hooks/useMobile";
import { useGetCoursesQuery } from "@/store/apis/db";

const Courses = () => {
  const { isMobile } = useMobile();

  const {
    data: courses = [],
    isLoading: isGetCousesLoading,
    isFetching: isGetCoursesFetching,
  } = useGetCoursesQuery();

  const isLoading = isGetCousesLoading || isGetCoursesFetching;

  return (
    <Flex flexDir="column" gap="1rem" minH="100vh" pb="1rem">
      <Text
        textTransform="uppercase"
        fontWeight="600"
        textAlign={{ base: "center", md: "left" }}
      >
        Danh sách khoá học
      </Text>
      {isLoading && <Spinner color="orange.300" />}
      <Grid templateColumns={`repeat(${isMobile ? 1 : 5}, 1fr)`} gap="1rem">
        {courses?.map((c) => (
          <CourseCard course={c} key={c.id} />
        ))}
      </Grid>
    </Flex>
  );
};

export default Courses;
