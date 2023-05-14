import { Flex, Text, Spinner, Grid, Button } from "@chakra-ui/react";
import { useGetStudentCoursesQuery } from "@/store/apis/db";
import { useCurrentUserSelector } from "@/store/slices/user";
import useMobile from "@/hooks/useMobile";
import { AiOutlineShop } from "react-icons/ai";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import StudentCourseCard from "@/views/Student/Courses/StudentCourseCard";

const StudentCourses = () => {
  const { isMobile } = useMobile();
  const router = useRouter();
  const currentUser = useCurrentUserSelector();
  const {
    data: studentCourses,
    isLoading: isGetStudentCoursesLoading,
    isFetching: isGetStudentCoursesFetching,
  } = useGetStudentCoursesQuery(
    {
      userId: currentUser?.uid ?? "",
    },
    {
      skip: !currentUser?.uid,
    }
  );

  const isLoading = isGetStudentCoursesFetching || isGetStudentCoursesLoading;

  return (
    <Flex flexDir="column" gap="1rem">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex gap="1rem">
          <Text fontWeight="600" textTransform="uppercase">
            Các khoá học đã đăng ký
          </Text>
          {isLoading && <Spinner color="orange.400" />}
        </Flex>
        <Button
          leftIcon={<AiOutlineShop size="1.25rem" />}
          onClick={() => router.push(ROUTE.store)}
        >
          Đến cửa hàng
        </Button>
      </Flex>
      <Grid templateColumns={`repeat(${isMobile ? 1 : 5}, 1fr)`} gap="1rem">
        {studentCourses?.map((course) => (
          <StudentCourseCard key={course.courseId} course={course} />
        ))}
      </Grid>
    </Flex>
  );
};

export default StudentCourses;
