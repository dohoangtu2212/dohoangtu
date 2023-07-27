import { ICourseLesson, ICourseLessonType } from "@/types/course";
import { Box, Text, Flex, Checkbox, FlexProps } from "@chakra-ui/react";
import { FC } from "react";
import { MdOndemandVideo, MdAssignment } from "react-icons/md";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { COLORS } from "@/constants/theme";
dayjs.extend(duration);

type CourseLessonProps = {
  lesson: ICourseLesson;
  lessonOrder?: string;
  onClick: FlexProps["onClick"];
  isActive?: boolean;
  isDisabled?: boolean;
  showViewCount?: boolean;
  viewsCount?: number;
};
const CourseLesson: FC<CourseLessonProps> = ({
  lesson,
  onClick,
  isActive,
  isDisabled,
  lessonOrder,
  showViewCount,
  viewsCount,
}) => {
  const dayjsLessonDuration = dayjs.duration((lesson.duration ?? 0) * 1000);
  const lessonDurationInMinutes =
    Math.round(dayjsLessonDuration.asMinutes() * 100) / 100;

  return (
    <Flex
      alignItems="flex-start"
      p="0.5rem"
      borderRadius="lg"
      gap="1rem"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      onClick={onClick}
      bgColor={isActive ? COLORS.whiteSatin : "initial"}
    >
      <Box py="0.125rem">
        <Checkbox isChecked={!!viewsCount} isDisabled />
      </Box>
      <Box w="100%">
        <Text fontSize="0.875rem" fontWeight="500">
          {!!lessonOrder
            ? `Bài ${lessonOrder}: ${lesson.name}
`
            : `${lesson.name}`}
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
            <Text fontSize="0.675rem">{lessonDurationInMinutes} phút</Text>
          </Flex>
          {showViewCount && (
            <Text fontSize="0.675rem">Lượt xem: {viewsCount}/20</Text>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default CourseLesson;
