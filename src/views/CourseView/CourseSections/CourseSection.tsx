import {
  ICourseSection,
  ICourseLesson,
  IDisabledLesson,
  IStudentCourse,
  IStudentViewCount,
} from "@/types/course";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { reduce } from "lodash";
import { FC } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import CourseLesson from "@/components/Course/CourseLesson";
dayjs.extend(duration);

type CourseSectionProps = {
  section: ICourseSection;
  disabledLessons?: IDisabledLesson[];
  selectedLesson?: ICourseLesson | null;
  onLessonSelected?: (lesson: ICourseLesson) => void;
  onDisabledLessonSelected?: () => void;
  viewsCount?: IStudentViewCount;
};
const CourseSection: FC<CourseSectionProps> = ({
  section,
  selectedLesson,
  disabledLessons = [],
  onLessonSelected,
  onDisabledLessonSelected,
  viewsCount,
}) => {
  const userRole = useUserRoleSelector();
  const isStudent = userRole === UserRole.student;

  const viewedLessons = section.lessons.filter((lesson) =>
    Object.keys(viewsCount ?? {}).includes(lesson.dyntubeKey)
  );

  return (
    <Accordion
      allowMultiple
      borderLeft="1px"
      borderRight="1px"
      borderColor="gray.300"
    >
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Flex justifyContent="space-between" w="100%">
              <Box>
                <Text fontWeight="600" textAlign="left">
                  Bài {section.order}: {section.name}
                </Text>
                {/* TODO: Add completion status */}
                <Text textAlign="left" fontSize="0.875rem" color="gray.500">
                  Đã xem: {viewedLessons.length}/{section?.lessons?.length ?? 0}
                </Text>
              </Box>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex flexDir="column" gap="1rem">
            {section.lessons?.map((lesson) => {
              const lessionVideoViewsCount =
                viewsCount?.[lesson.dyntubeKey] ?? 0;
              const isActive =
                selectedLesson?.order === `${section.order}.${lesson.order}`;

              const isDisabled = !!disabledLessons.find(
                (dL) =>
                  dL.lessonOrder === lesson.order &&
                  dL.sectionOrder === section.order
              );

              const handleClick = () => {
                if (isDisabled) return onDisabledLessonSelected?.();
                onLessonSelected?.({
                  ...lesson,
                  order: `${section.order}.${lesson.order}`,
                });
              };

              return (
                <CourseLesson
                  lesson={lesson}
                  onClick={handleClick}
                  isActive={isActive}
                  isDisabled={isDisabled}
                  lessonOrder={`${section.order}.${lesson.order}`}
                  showViewCount={isStudent}
                  viewsCount={lessionVideoViewsCount}
                  key={lesson.order}
                />
              );
            })}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseSection;
