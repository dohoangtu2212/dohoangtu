import { Flex, Grid, Text, Spinner } from "@chakra-ui/react";

import CourseCard from "@/components/Course/CourseCard";
import useMobile from "@/hooks/useMobile";
import { useGetCoursesQuery, useGetStudentCoursesQuery } from "@/store/apis/db";
import { COLORS } from "@/constants/theme";
import { useCurrentUserSelector } from "@/store/slices/user";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";

const Courses = () => {
  const { isMobile } = useMobile();
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();

  const {
    data: courses = [],
    isLoading: isGetCousesLoading,
    isFetching: isGetCoursesFetching,
  } = useGetCoursesQuery();

  const {
    data: studentCourses = [],
    isLoading: isGetStudentCoursesLoading,
    isFetching: isGetStudentCoursesFetching,
  } = useGetStudentCoursesQuery(
    {
      userId: currentUser?.uid ?? "",
    },
    {
      skip: !currentUser?.uid || userRole !== UserRole.student,
    }
  );

  const isLoading =
    isGetCousesLoading ||
    isGetCoursesFetching ||
    isGetStudentCoursesLoading ||
    isGetStudentCoursesFetching;

  return (
    <Flex flexDir="column" gap="1rem" minH="100vh" pb="1rem">
      <Text
        textTransform="uppercase"
        fontWeight="600"
        textAlign={{ base: "center", md: "left" }}
      >
        Danh sách khoá học
      </Text>
      {isLoading && <Spinner color={COLORS.twilightBlue} />}
      <Grid templateColumns={`repeat(${isMobile ? 1 : 5}, 1fr)`} gap="1rem">
        {courses?.map((course) => {
          const isPurchased = !!studentCourses.find(
            (c) => c.courseId === course.id
          );
          return <CourseCard course={course} key={course.id} isPurchased={isPurchased}/>;
        })}
      </Grid>
    </Flex>
  );
};

export default Courses;
