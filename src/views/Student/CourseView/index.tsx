import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

import CourseSections from "@/views/Student/CourseView/CourseSections";
import CourseMain from "@/views/Student/CourseView/CourseMain";
import { useState } from "react";
import { ICourseLesson } from "@/types/course";
import { useRouter } from "next/router";
import { useGetCourseDetailsQuery } from "@/store/apis/db";

const StudentCourseView = () => {
  const router = useRouter();
  const { query, pathname } = router;
  const courseDetailsId = query?.courseDetailsId;
  const {
    data: courseDetails,
    isLoading: isGetCourseDetailsLoading,
    isFetching: isGetCourseDetailsFetching,
  } = useGetCourseDetailsQuery(
    {
      id: (courseDetailsId as string) ?? "",
    },
    { skip: !courseDetailsId }
  );

  const isLoading = isGetCourseDetailsFetching || isGetCourseDetailsLoading;

  const [selectedLesson, setSelectedLesson] = useState<ICourseLesson | null>(
    null
  );

  if (!courseDetailsId)
    return (
      <Box p="1rem">
        <Text>Không tìm thấy khoá học này</Text>
      </Box>
    );

  if (isLoading)
    return (
      <Box p="1rem">
        <Spinner color="orange.300" />
      </Box>
    );

  if (!courseDetails) return null;

  return (
    <Flex minH="100vh">
      <Box flex="3">
        <CourseMain course={courseDetails} selectedLesson={selectedLesson} />
      </Box>
      <Box flex="1">
        <CourseSections
          course={courseDetails}
          onLessonSelected={setSelectedLesson}
        />
      </Box>
    </Flex>
  );
};

export default StudentCourseView;
