import { Flex, Text, Spinner, Grid } from "@chakra-ui/react";
import useMobile from "@/hooks/useMobile";
import { useGetCoursesQuery } from "@/store/apis/db";
import CourseCard from "@/components/Course/CourseCard";

const NewestCourses = () => {
  const { isMobile } = useMobile();

  const {
    data: courses = [],
    isLoading: isGetCousesLoading,
    isFetching: isGetCoursesFetching,
  } = useGetCoursesQuery();

  const isLoading = isGetCousesLoading || isGetCoursesFetching;

  return (
    <Flex flexDir="column" gap="1rem" py="1rem">
      <Text fontWeight="600" textTransform="uppercase" fontSize="1.25rem">
        Khoá học mới nhất
      </Text>
      {isLoading && <Spinner color="orange.300" />}
      <Grid templateColumns={`repeat(${isMobile ? 1 : 4}, 1fr)`} gap="1rem">
        {courses.slice(0, 4).map((c) => (
          <CourseCard course={c} key={c.id} />
        ))}
      </Grid>
    </Flex>
  );
};

export default NewestCourses;
