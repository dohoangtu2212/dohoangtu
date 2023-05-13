import { Flex, Grid, Text, Spinner } from "@chakra-ui/react";

import CourseCard from "@/components/Course/CourseCard";
import useMobile from "@/hooks/useMobile";
import { useGetCoursesQuery } from "@/store/apis/db";
import { COURSES } from "@/mocks/course";

const Courses = () => {
  const { isMobile } = useMobile();

  const {
    data: courses = [],
    isLoading: isGetCousesLoading,
    isFetching: isGetCoursesFetching,
  } = useGetCoursesQuery();

  const isLoading = isGetCousesLoading || isGetCoursesFetching;

  return (
    <Flex flexDir="column" gap="1rem" minH="100vh">
      <Text textTransform="uppercase" fontWeight="600">
        Danh sách khoá học
      </Text>
      {isLoading && <Spinner color="orange.300" />}
      <Grid templateColumns={`repeat(${isMobile ? 1 : 5}, 1fr)`} gap="1rem">
        {COURSES?.map((c) => (
          <CourseCard course={c} key={c.id} />
        ))}
      </Grid>
    </Flex>
  );
};

export default Courses;
