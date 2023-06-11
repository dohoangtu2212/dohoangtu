import {
  ICourseSection,
  ICourseLesson,
  ICourseLessonType,
  IDisabledLesson,
  IStudentCourse,
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
  Checkbox,
} from "@chakra-ui/react";
import { reduce } from "lodash";
import { FC } from "react";
import { MdOndemandVideo, MdAssignment } from "react-icons/md";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { COLORS } from "@/constants/theme";
dayjs.extend(duration);

type CourseSectionProps = {
  section: ICourseSection;
  disabledLessons: IDisabledLesson[];
  selectedLesson: ICourseLesson | null;
  onLessonSelected: (lesson: ICourseLesson) => void;
  onDisabledLessonSelected: () => void;
  viewsCount?: IStudentCourse["viewsCount"];
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

  const sectionLessons = section.lessons ?? [];
  const sectionDuration =
    reduce(
      sectionLessons,
      (totalDuration, lesson) => totalDuration + lesson.duration,
      0
    ) ?? 0;
  const dayjsDuration = dayjs.duration(sectionDuration * 1000);
  const sectionDurationInMinutes =
    Math.round(dayjsDuration.asMinutes() * 100) / 100;

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
                  CHƯƠNG {section.order}: {section.name}
                </Text>
                {/* TODO: Add completion status */}
                <Text textAlign="left" fontSize="0.675rem" color="gray.500">
                  {0}/4 | {sectionDurationInMinutes ?? 0} phút
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

              const dayjsLessonDuration = dayjs.duration(
                (lesson.duration ?? 0) * 1000
              );
              const lessonDurationInMinutes =
                Math.round(dayjsLessonDuration.asMinutes() * 100) / 100;

              return (
                <Flex
                  alignItems="flex-start"
                  p="0.5rem"
                  borderRadius="lg"
                  gap="1rem"
                  key={lesson.order}
                  cursor={isDisabled ? "not-allowed" : "pointer"}
                  onClick={() => {
                    if (isDisabled) return onDisabledLessonSelected?.();
                    onLessonSelected?.({
                      ...lesson,
                      order: `${section.order}.${lesson.order}`,
                    });
                  }}
                  bgColor={isActive ? COLORS.whiteSatin : "initial"}
                >
                  <Box py="0.125rem">
                    <Checkbox isChecked={false} isDisabled />
                  </Box>
                  <Box w="100%">
                    <Text fontSize="0.875rem" fontWeight="500">
                      Bài {section.order}.{lesson.order}: {lesson.name}
                    </Text>
                    <Flex
                      alignItems="center"
                      color="gray.500"
                      justifyContent="space-between"
                    >
                      <Flex alignItems="center" gap="0.5rem">
                        {lesson.type === ICourseLessonType.video ? (
                          <MdOndemandVideo />
                        ) : (
                          <MdAssignment />
                        )}
                        <Text fontSize="0.675rem">
                          {lessonDurationInMinutes} phút
                        </Text>
                      </Flex>
                      {isStudent && (
                        <Text fontSize="0.675rem">
                          Lượt xem: {lessionVideoViewsCount}/20
                        </Text>
                      )}
                    </Flex>
                  </Box>
                </Flex>
              );
            })}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseSection;
