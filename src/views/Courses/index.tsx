import {
  Flex,
  Grid,
  Text,
  Spinner,
  TextProps,
  Divider,
} from "@chakra-ui/react";

import CourseCard from "@/components/Course/CourseCard";
import useMobile from "@/hooks/useMobile";
import { useGetCoursesQuery, useGetStudentCoursesQuery } from "@/store/apis/db";
import { COLORS } from "@/constants/theme/colors";
import { useCurrentUserSelector } from "@/store/slices/user";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { FC } from "react";

type CoursesProps = {};
const Courses: FC<CoursesProps> = () => {
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

  const coursesToShow = courses.filter((c) => c.showInStore);

  return (
    <Flex flexDir="column" gap="1rem" minH="100vh" py="1rem">
      <Flex flexDir="column" gap="1rem">
        <Title>Gói khoá học</Title>
        <Text>Cập nhật...</Text>
      </Flex>
      <Divider />
      <Flex flexDir="column" gap="1rem">
        <Title>Khoá học</Title>
        {isLoading && <Spinner color={COLORS.twilightBlue} />}
        <Grid templateColumns={`repeat(${isMobile ? 1 : 4}, 1fr)`} gap="1rem">
          {coursesToShow.map((course) => {
            const isPurchased = !!studentCourses.find(
              (c) => c.courseId === course.id
            );

            return (
              <CourseCard
                course={course}
                key={course.id}
                isPurchased={isPurchased}
              />
            );
          })}
        </Grid>
      </Flex>
    </Flex>
  );
};

type TitleProps = TextProps & {};
const Title: FC<TitleProps> = ({ children, ...textProps }) => {
  return (
    <Text
      textTransform="uppercase"
      fontWeight="600"
      textAlign={{ base: "center", md: "left" }}
      {...textProps}
    >
      {children}
    </Text>
  );
};

export default Courses;
