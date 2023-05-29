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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";
import {
  MdOndemandVideo,
  MdAssignment,
  MdAdd,
  MdCheck,
  MdOutlineDelete,
} from "react-icons/md";
import {
  ICourseFormValues,
  ICourseLesson,
  ICourseLessonType,
  ICourseSection,
} from "@/types/course";
import { FormikHelpers } from "formik";
import LessonTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/LessonTitle";
import VideoUploadModal from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/VideoUploadModal";
import { IUploadVideoResponse } from "@/types/dyntube";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import VideoPreviewModal from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/VideoPreviewModal";
dayjs.extend(duration);

type LessonsProps = {
  values: ICourseFormValues;
  section: ICourseSection;
  sectionIdx: number;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};
const Lessons: FC<LessonsProps> = ({
  values,
  section,
  sectionIdx,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const { lessons } = section;
  const handleAddNewLesson = () => {
    const { lessons = [] } = section;
    const order = !lessons.length
      ? 1
      : (lessons[lessons.length - 1].order as number) + 1;
    handleSetFieldValue(`sections[${sectionIdx}].lessons`, [
      ...lessons,
      {
        order,
        name: "",
        type: ICourseLessonType.video,
        duration: 0,
        dyntubeKey: "",
      },
    ]);
    handleSetFieldValue("lessons", values.lessons + 1);
  };

  return (
    <Flex flexDir="column" gap="1rem" alignItems="flex-start">
      {lessons?.map((lesson, lessonIdx) => (
        <Lesson
          key={`lesson-${lesson.order}`}
          section={section}
          sectionIdx={sectionIdx}
          lesson={lesson}
          lessonIdx={lessonIdx}
          handleSetFieldValue={handleSetFieldValue}
          handleSetFieldTouched={handleSetFieldTouched}
        />
      ))}
      <Button leftIcon={<MdAdd />} onClick={handleAddNewLesson}>
        Thêm Bài
      </Button>
    </Flex>
  );
};

type LessonProps = {
  section: ICourseSection;
  sectionIdx: number;
  lesson: ICourseLesson;
  lessonIdx: number;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};
const Lesson: FC<LessonProps> = ({
  section,
  sectionIdx,
  lesson,
  lessonIdx,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const {
    isOpen: isUploadVideoModalOpen,
    onOpen: onOpenUploadVideoModal,
    onClose: onCloseUploadVideoModal,
  } = useDisclosure();

  const lessonOrder = `${section.order}.${lesson.order}`;
  const isVideoLesson = lesson.type === ICourseLessonType.video;

  const handleLessonTitleChange: InputProps["onChange"] = (ev) => {
    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].name`,
      ev.target.value
    );
  };

  const handleLessonTypeChange = (val: ICourseLessonType) => {
    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].type`,
      val
    );
  };

  const handleLessonDurationChange: (dur: number) => void = (dur) => {
    const dayjsDuration = dayjs.duration(dur * 1000);
    const hours = Math.round(dayjsDuration.asHours() * 100) / 100;

    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].duration`,
      dur
    );
    handleSetFieldValue("hours", hours);
  };

  const handleDeleteLesson = (lesson: ICourseLesson) => async () => {
    const idx = section.lessons?.findIndex((l) => l.order === lesson.order);
    if (idx === -1) return;
    await handleSetFieldValue(
      `sections[${sectionIdx}].lessons`,
      section.lessons
        ?.filter((l) => l.order !== lesson.order)
        .map((l, idx) => ({ ...l, order: idx + 1 }))
    );
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
            aria-label="delete"
            icon={<MdOutlineDelete size="1.5rem" />}
            variant="ghost"
            onClick={handleDeleteLesson(lesson)}
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
            section={section}
            sectionIdx={sectionIdx}
            lesson={lesson}
            lessonIdx={lessonIdx}
            handleSetFieldValue={handleSetFieldValue}
            handleSetFieldTouched={handleSetFieldTouched}
          />
        </Flex>

        {/* <Button
          variant="outline"
          leftIcon={isVideoUploaded ? <MdCheck color="green" /> : <MdAdd />}
          onClick={onOpenUploadVideoModal}
        >
          Video
        </Button> */}
      </Flex>
      <Divider />
    </Fragment>
  );
};

type VideoLessonProps = {
  section: ICourseSection;
  sectionIdx: number;
  lesson: ICourseLesson;
  lessonIdx: number;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};
const VideoLesson: FC<VideoLessonProps> = ({
  section,
  sectionIdx,
  lesson,
  lessonIdx,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const {
    isOpen: isPreviewModalOpen,
    onOpen: openPreviewModal,
    onClose: closePreviewModal,
  } = useDisclosure();

  const handleLessonVideoKeyChange: (videoKey: string) => void = (videoKey) => {
    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].dyntubeKey`,
      videoKey
    );
  };

  const previewVideoKey = lesson.dyntubeKey;

  return (
    <Flex flexDir="column" w="100%" gap="0.5rem">
      {!!previewVideoKey && (
        <VideoPreviewModal
          dynTubeKey={previewVideoKey}
          isOpen={isPreviewModalOpen}
          onClose={closePreviewModal}
        />
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text>Video Key</Text>
        <Button
          p="0.25rem 1rem"
          h="fit-content"
          isDisabled={!previewVideoKey}
          onClick={openPreviewModal}
        >
          Xem thử
        </Button>
      </Flex>
      <Input
        type="text"
        placeholder="Nhập Video Key"
        value={lesson.dyntubeKey}
        onChange={(e) => handleLessonVideoKeyChange(e.target.value)}
      />
    </Flex>
  );
};

export default Lessons;
