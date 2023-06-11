import { Flex, Text, IconButton } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import CourseSection from "@/views/CourseView/CourseSections/CourseSection";
import { ICourseDetails, ICourseLesson } from "@/types/course";
import { FC } from "react";
import useMobile from "@/hooks/useMobile";
import type { IDisabledLesson } from "@/types/course";
import { useGetStudentViewsCountQuery } from "@/store/apis/db";
import {
  useUserRoleSelector,
  useCurrentUserSelector,
} from "@/store/slices/user";
import { UserRole } from "@/types/permission";

type CourseSectionsProps = {
  course: ICourseDetails;
  disabledLessons: IDisabledLesson[];
  selectedLesson: ICourseLesson | null;
  onLessonSelected: (lesson: ICourseLesson) => void;
  onDisabledLessonSelected: () => void;
};
const CourseSections: FC<CourseSectionsProps> = ({
  course,
  selectedLesson,
  disabledLessons = [],
  onLessonSelected = () => {},
  onDisabledLessonSelected,
}) => {
  const { sections } = course;
  const { isMobile } = useMobile();

  const userRole = useUserRoleSelector();
  const currentUser = useCurrentUserSelector();
  const {
    data: viewsCount,
    isLoading: isGetStudentViewsCountLoading,
    isFetching: isGetStudentViewsCountFetching,
  } = useGetStudentViewsCountQuery(
    {
      studentId: currentUser?.uid as string,
    },
    {
      skip: !currentUser?.uid || userRole !== UserRole.student,
    }
  );

  return (
    <Flex
      flexDir="column"
      position="sticky"
      top="0"
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
          selectedLesson={selectedLesson}
          viewsCount={viewsCount}
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
