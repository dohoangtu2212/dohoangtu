import { Flex, Grid, Heading, Text } from "@chakra-ui/react";

import CourseCard from "@/components/Course/CourseCard";
import { COURSES } from "@/mocks/course";
import useMobile from "@/hooks/useMobile";

const Courses = () => {
  const { isMobile } = useMobile();
  return (
    <Flex flexDir="column" gap="1rem">
      <Heading fontSize={{ base: "1.5rem", md: "2rem" }} fontWeight="600">
        Danh sách khoá học
      </Heading>
      <Grid templateColumns={`repeat(${isMobile ? 1 : 5}, 1fr)`} gap="1rem">
        {COURSES.map((c) => (
          <Flex key={c.id}>
            <CourseCard course={c} />
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};

export default Courses;
