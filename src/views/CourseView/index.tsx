import { Box, Flex, IconButton, Spinner, Text } from "@chakra-ui/react";

import CourseSections from "@/views/CourseView/CourseSections";
import CourseMain from "@/views/CourseView/CourseMain";
import { useEffect, useState } from "react";
import { ICourseLesson } from "@/types/course";
import { useRouter } from "next/router";
import { useGetCourseDetailsQuery } from "@/store/apis/db";
import { MdArrowBackIos } from "react-icons/md";

const CourseView = () => {
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

  useEffect(() => {
    if (!!courseDetails) {
      setSelectedLesson({
        ...courseDetails.sections[0].lessons[0],
        order: `${courseDetails.sections[0].order}.${courseDetails.sections[0].lessons[0].order}`,
      });
    }
  }, [courseDetails]);

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
    <Flex minH="100vh" flexDir="column" pt="1rem">
      <Flex px="2rem" alignItems="center" gap="0.5rem">
        <IconButton
          aria-label="back"
          icon={<MdArrowBackIos size="1.5rem" />}
          variant="ghost"
          p="0"
          onClick={() => router.back()}
        />
        <Text fontWeight="600">KHÓA: {courseDetails.name}</Text>
      </Flex>
      <Flex flexDir={{ base: "column", md: "row" }}>
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
    </Flex>
  );
};

export default CourseView;
