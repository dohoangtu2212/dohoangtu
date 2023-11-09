import {
  Flex,
  Text,
  IconButton,
  Divider,
  InputProps,
  Tooltip,
  Box,
  Button,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";
import { MdOndemandVideo, MdAssignment, MdOutlineDelete } from "react-icons/md";
import {
  ICourseLesson,
  ICourseLessonPractice,
  ICourseLessonType,
} from "@/types/course";
import LessonTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/LessonTitle";
import LessonLinks from "./LessonLinks";
import LessonVideo from "./LessonVideo";
import LessonPractices from "./LessonPractices";
import LessonType from "./LessonType";

interface LessonProps {
  sectionOrder?: number;
  lesson: ICourseLesson;
  onLessonChange?: (lesson: ICourseLesson) => void;
  onLessonDelete?: () => void;
}
const Lesson: FC<LessonProps> = ({
  lesson,
  sectionOrder,
  onLessonChange,
  onLessonDelete,
}) => {
  const lessonOrder = `${sectionOrder}.${lesson.order}`;

  const handleLessonTitleChange: InputProps["onChange"] = (ev) => {
    const name = ev.target.value;
    onLessonChange?.({
      ...lesson,
      name,
    });
  };

  const handleLessonTypeChange = (val: ICourseLessonType) => {
    const type = val;
    onLessonChange?.({
      ...lesson,
      type,
    });
  };

  // TODO: handle lesson duration
  const handleLessonDurationChange: (dur: number) => void = (duration) => {
    onLessonChange?.({
      ...lesson,
      duration,
    });
  };

  const handleDeleteLesson = () => {
    onLessonDelete?.();
  };

  const handleChangeVideoKey = (videoKey: string) => {
    onLessonChange?.({
      ...lesson,
      dyntubeKey: videoKey,
    });
  };

  const handleLessonLinksChange = (links: string[]) => {
    onLessonChange?.({
      ...lesson,
      links,
    });
  };

  const handleLessonPracticesChange = (practices: ICourseLessonPractice[]) => {
    onLessonChange?.({
      ...lesson,
      practices,
    });
  };

  return (
    <Fragment>
      <Flex alignItems="center" w="100%">
        <Box flex="1">
          <LessonTitle
            lessonOrder={lessonOrder}
            value={lesson.name}
            onChange={handleLessonTitleChange}
          />
        </Box>
        <Tooltip label={`Xoá Bài ${lessonOrder}`}>
          <IconButton
            p="0"
            aria-label="delete"
            icon={<MdOutlineDelete size="1.5rem" />}
            variant="ghost"
            onClick={handleDeleteLesson}
          />
        </Tooltip>
      </Flex>
      <Flex w="100%" px="2rem">
        <Flex flexDir="column" flex="2" gap="1rem">
          <LessonType
            type={lesson.type ?? ICourseLessonType.video}
            onTypeChange={handleLessonTypeChange}
          />
          <Box pt="0.5rem">
            {lesson.type === ICourseLessonType.video && (
              <LessonVideo
                videoKey={lesson.dyntubeKey}
                onVideoKeyChange={handleChangeVideoKey}
              />
            )}
            {lesson.type === ICourseLessonType.assignment && (
              <LessonPractices
                practices={lesson.practices ?? []}
                onPracticesChange={handleLessonPracticesChange}
              />
            )}
          </Box>
          <Divider />
          <LessonLinks
            links={lesson.links ?? []}
            onLinksChange={handleLessonLinksChange}
          />
        </Flex>
      </Flex>
      <Divider />
    </Fragment>
  );
};

export default Lesson;
