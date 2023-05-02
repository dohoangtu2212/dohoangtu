import { Box, Flex } from "@chakra-ui/react";

import CourseSections from "@/views/Student/Courses/View/CourseSections";
import CourseMain from "@/views/Student/Courses/View/CourseMain";
import { COURSE_DETAILS } from "@/mocks/course";
import { useState } from "react";
import { ICourseLesson } from "@/types/course";

const StudentCoursesView = () => {
  const defaultVideoKey = COURSE_DETAILS.sections[0].lessons[0];

  const [selectedLesson, setSelectedLesson] = useState<ICourseLesson | null>(
    defaultVideoKey ?? null
  );

  return (
    <Flex minH="100vh">
      <Box flex="3">
        <CourseMain course={COURSE_DETAILS} selectedLesson={selectedLesson} />
      </Box>
      <Box flex="1">
        <CourseSections
          course={COURSE_DETAILS}
          onLessonSelected={setSelectedLesson}
        />
      </Box>
    </Flex>
  );
};

export default StudentCoursesView;
