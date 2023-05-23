import {
  ICourseSection,
  ICourseLesson,
  ICourseLessonType,
  IDisabledLesson,
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
dayjs.extend(duration);

type CourseSectionProps = {
  section: ICourseSection;
  disabledLessons: IDisabledLesson[];
  onLessonSelected: (lesson: ICourseLesson) => void;
  onDisabledLessonSelected: () => void;
};
const CourseSection: FC<CourseSectionProps> = ({
  section,
  disabledLessons = [],
  onLessonSelected,
  onDisabledLessonSelected,
}) => {
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
                >
                  <Box py="0.125rem">
                    <Checkbox isChecked={false} isDisabled />
                  </Box>
                  <Box>
                    <Text fontSize="0.875rem" fontWeight="500">
                      Bài {section.order}.{lesson.order}: {lesson.name}
                    </Text>
                    <Flex gap="0.5rem" alignItems="center" color="gray.500">
                      {lesson.type === ICourseLessonType.video ? (
                        <MdOndemandVideo />
                      ) : (
                        <MdAssignment />
                      )}
                      <Text fontSize="0.675rem">
                        {lessonDurationInMinutes} phút
                      </Text>
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
