import {
  ICourseSection,
  ICourseLesson,
  ICourseLessonType,
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
import { FC } from "react";
import { MdOndemandVideo, MdAssignment } from "react-icons/md";

type CourseSectionProps = {
  section: ICourseSection;
  onLessonSelected: (lesson: ICourseLesson) => void;
};
const CourseSection: FC<CourseSectionProps> = ({
  section,
  onLessonSelected = () => {},
}) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Flex justifyContent="space-between" w="100%">
              <Box>
                <Text fontWeight="600" textAlign="left">
                  CHƯƠNG {section.order}: {section.name}
                </Text>
                <Text textAlign="left" fontSize="0.675rem" color="gray.500">
                  4/4 | 12 phút
                </Text>
              </Box>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex flexDir="column" gap="1rem">
            {section.lessons.map((lesson) => (
              <Flex
                alignItems="flex-start"
                gap="1rem"
                key={lesson.order}
                cursor="pointer"
                onClick={() => onLessonSelected(lesson)}
              >
                <Box py="0.125rem">
                  <Checkbox isChecked={lesson.isCompleted} isDisabled />
                </Box>
                <Box>
                  <Text fontSize="0.875rem" fontWeight="500">
                    Bài {lesson.order}: {lesson.name}
                  </Text>
                  <Flex gap="0.5rem" alignItems="center" color="gray.500">
                    {lesson.type === ICourseLessonType.video ? (
                      <MdOndemandVideo />
                    ) : (
                      <MdAssignment />
                    )}
                    <Text fontSize="0.675rem">7 phút</Text>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseSection;
