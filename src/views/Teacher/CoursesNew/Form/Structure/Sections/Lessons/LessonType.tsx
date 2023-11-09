import { Flex, Text, Button } from "@chakra-ui/react";
import { FC } from "react";
import { MdOndemandVideo, MdAssignment } from "react-icons/md";
import { ICourseLessonType } from "@/types/course";

interface LessonTypeProps {
  type: ICourseLessonType;
  onTypeChange?: (type: ICourseLessonType) => void;
}
const LessonType: FC<LessonTypeProps> = ({ type, onTypeChange }) => {
  const isVideoLesson = type === ICourseLessonType.video;

  return (
    <Flex alignItems="center" gap="0.5rem">
      <Text fontWeight="700">Phân loại:</Text>
      <Button
        aria-label="video"
        variant="text"
        bgColor={isVideoLesson ? "green.400" : "transparent"}
        leftIcon={<MdOndemandVideo />}
        onClick={() => onTypeChange?.(ICourseLessonType.video)}
      >
        Video
      </Button>
      <Button
        aria-label="video"
        variant="text"
        bgColor={!isVideoLesson ? "green.400" : "transparent"}
        leftIcon={<MdAssignment />}
        onClick={() => onTypeChange?.(ICourseLessonType.assignment)}
      >
        Bài tập
      </Button>
    </Flex>
  );
};

export default LessonType;
