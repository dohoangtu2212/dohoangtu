import { Flex, Grid, Heading, Text } from "@chakra-ui/react";

import CourseCard from "@/components/Course/CourseCard";
import { COURSES } from "@/mocks/course";
import useMobile from "@/hooks/useMobile";

const Courses = () => {
  const { isMobile } = useMobile();
  return (
    <Flex flexDir="column" gap="1rem" minH="100vh">
      <Text textTransform="uppercase" fontWeight="600">
        Danh sách khoá học
      </Text>
      <Grid templateColumns={`repeat(${isMobile ? 1 : 5}, 1fr)`} gap="1rem">
        {COURSES.map((c) => (
          <CourseCard course={c} key={c.id} />
        ))}
      </Grid>
    </Flex>
  );
};

export default Courses;
