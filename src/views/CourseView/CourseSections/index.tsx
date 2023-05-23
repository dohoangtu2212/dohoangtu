import { Flex, Text, IconButton } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import CourseSection from "@/views/CourseView/CourseSections/CourseSection";
import { ICourseDetails, ICourseLesson } from "@/types/course";
import { FC } from "react";
import useMobile from "@/hooks/useMobile";
import type { IDisabledLesson } from "@/types/course";

type CourseSectionsProps = {
  course: ICourseDetails;
  disabledLessons: IDisabledLesson[];
  onLessonSelected: (lesson: ICourseLesson) => void;
  onDisabledLessonSelected: () => void;
};
const CourseSections: FC<CourseSectionsProps> = ({
  course,
  disabledLessons = [],
  onLessonSelected = () => {},
  onDisabledLessonSelected,
}) => {
  const { sections } = course;
  const { isMobile } = useMobile();

  return (
    <Flex
      flexDir="column"
      position="sticky"
      top="0"
      zIndex="30"
      maxH="100vh"
      overflowY="auto"
    >
      {!isMobile && (
        <Flex
          p="1rem"
          border="1px"
          borderColor="gray.300"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontWeight="600">MỤC LỤC</Text>
          <IconButton
            aria-label="close"
            icon={<MdClose size="1.25rem" />}
            variant="ghost"
          />
        </Flex>
      )}
      {sections?.map((sec) => (
        <CourseSection
          disabledLessons={disabledLessons}
          section={sec}
          key={sec.order}
          onLessonSelected={onLessonSelected}
          onDisabledLessonSelected={onDisabledLessonSelected}
        />
      ))}
    </Flex>
  );
};

export default CourseSections;
