import {
  Button,
  Flex,
  Text,
  IconButton,
  Divider,
  useDisclosure,
  InputProps,
  Tooltip,
  Box,
  Input,
} from "@chakra-ui/react";
import { FC, Fragment, useCallback } from "react";
import {
  MdOndemandVideo,
  MdAssignment,
  MdAdd,
  MdOutlineDelete,
} from "react-icons/md";
import {
  ICourseLesson,
  ICourseLessonType,
  ICourseSection,
} from "@/types/course";
import LessonTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/LessonTitle";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import VideoPreviewModal from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/VideoPreviewModal";
dayjs.extend(duration);

type LessonsProps = {
  section: ICourseSection;
  onLessonsChange: (lessons: ICourseLesson[]) => void;
};
const Lessons: FC<LessonsProps> = ({ section, onLessonsChange }) => {
  const { lessons } = section;
  const handleAddNewLesson = () => {
    const { lessons = [] } = section;
    const order = !lessons.length
      ? 1
      : (lessons[lessons.length - 1].order as number) + 1;

    onLessonsChange([
      ...lessons,
      {
        order,
        name: "",
        type: ICourseLessonType.video,
        duration: 0,
        dyntubeKey: "",
      },
    ]);
  };

  // delete then update idx and order
  const handleLessonDelete = useCallback(
    (lesson: ICourseLesson) => () => {
      const idx = section.lessons?.findIndex((l) => l.order === lesson.order);
      if (idx === -1) return;
      const lessonsAfterDelete = section.lessons?.filter(
        (l) => l.order !== lesson.order
      );
      const lessonsWithOrderUpdated = lessonsAfterDelete.map((l, idx) => ({
        ...l,
        order: idx + 1,
      }));

      onLessonsChange(lessonsWithOrderUpdated);
    },
    [section, onLessonsChange]
  );

  const handleLessonChange = (lesson: ICourseLesson) => {
    const { lessons } = section;
    const idx = lessons?.findIndex((l) => l.order === lesson.order);
    if (idx === -1) return;
    const updatedLessons = [...lessons];
    updatedLessons.splice(idx, 1, lesson);
    onLessonsChange(updatedLessons);
  };

  return (
    <Flex flexDir="column" gap="1rem" alignItems="flex-start">
      {lessons?.map((lesson) => (
        <Lesson
          key={`lesson-${lesson.order}`}
          sectionOrder={section.order}
          lesson={lesson}
          onLessonDelete={handleLessonDelete(lesson)}
          onLessonChange={handleLessonChange}
        />
      ))}
      <Button onClick={handleAddNewLesson}>Thêm phần</Button>
    </Flex>
  );
};

type LessonProps = {
  sectionOrder?: number;
  lesson: ICourseLesson;
  onLessonChange?: (lesson: ICourseLesson) => void;
  onLessonDelete?: () => void;
};
const Lesson: FC<LessonProps> = ({
  lesson,
  sectionOrder,
  onLessonChange,
  onLessonDelete,
}) => {
  const lessonOrder = `${sectionOrder}.${lesson.order}`;
  const isVideoLesson = lesson.type === ICourseLessonType.video;

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
      <Flex w="100%">
        <Box flex="1" />
        <Flex flexDir="column" alignItems="flex-end" flex="2" gap="1rem">
          <Flex alignItems="center" gap="0.5rem">
            <Text>Type</Text>
            <IconButton
              aria-label="video"
              variant="outline"
              bgColor={isVideoLesson ? "green.400" : "transparent"}
              icon={<MdOndemandVideo />}
              onClick={() => handleLessonTypeChange(ICourseLessonType.video)}
            />
            <IconButton
              aria-label="video"
              variant="outline"
              bgColor={!isVideoLesson ? "green.400" : "transparent"}
              // TODO: support assignment
              isDisabled
              icon={<MdAssignment />}
              onClick={() =>
                handleLessonTypeChange(ICourseLessonType.assignment)
              }
            />
          </Flex>
          <VideoLesson
            videoKey={lesson.dyntubeKey}
            onVideoKeyChange={handleChangeVideoKey}
          />
        </Flex>
      </Flex>
      <Divider />
    </Fragment>
  );
};

type VideoLessonProps = {
  videoKey?: string;
  onVideoKeyChange?: (key: string) => void;
};
const VideoLesson: FC<VideoLessonProps> = ({ videoKey, onVideoKeyChange }) => {
  const {
    isOpen: isPreviewModalOpen,
    onOpen: openPreviewModal,
    onClose: closePreviewModal,
  } = useDisclosure();

  return (
    <Flex flexDir="column" w="100%" gap="0.5rem">
      {!!videoKey && (
        <VideoPreviewModal
          dynTubeKey={videoKey}
          isOpen={isPreviewModalOpen}
          onClose={closePreviewModal}
        />
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text>Video Key</Text>
        <Button
          p="0.25rem 1rem"
          h="fit-content"
          isDisabled={!videoKey}
          onClick={openPreviewModal}
        >
          Xem thử
        </Button>
      </Flex>
      <Input
        type="text"
        placeholder="Nhập Video Key"
        value={videoKey}
        onChange={(e) => onVideoKeyChange?.(e.target.value)}
      />
    </Flex>
  );
};

export default Lessons;
