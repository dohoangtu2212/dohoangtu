import {
  Button,
  Flex,
  Text,
  IconButton,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, Fragment } from "react";
import { MdOndemandVideo, MdAssignment, MdAdd, MdCheck } from "react-icons/md";
import type { EditableProps } from "@chakra-ui/react";
import {
  ICourseFormValues,
  ICourseLesson,
  ICourseLessonType,
  ICourseSection,
} from "@/types/course";
import { FormikHelpers } from "formik";
import LessonTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/LessonTitle";
import VideoUploadModal from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/VideoUploadModal";

type LessonsProps = {
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
  section,
  sectionIdx,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const { lessons } = section;
  const handleAddNewLesson = () => {
    const { lessons } = section;
    const order = !lessons.length ? 1 : lessons[lessons.length - 1].order + 1;
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
  };

  return (
    <Flex flexDir="column" gap="1rem" alignItems="flex-start">
      {lessons.map((lesson, lessonIdx) => (
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

  const handleLessonTitleChange: EditableProps["onChange"] = (val) => {
    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].name`,
      val
    );
  };

  const handleLessonTypeChange = (val: ICourseLessonType) => {
    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].type`,
      val
    );
  };

  const handleLessonDyntubeKeyChange: (val: string) => void = (val) => {
    handleSetFieldValue(
      `sections[${sectionIdx}].lessons[${lessonIdx}].dyntubeKey`,
      val
    );
  };

  const isVideoUploaded = !!lesson.dyntubeKey;

  return (
    <Fragment>
      <VideoUploadModal
        isOpen={isUploadVideoModalOpen}
        onClose={onCloseUploadVideoModal}
        onUploaded={(video) => {
          handleLessonDyntubeKeyChange(video.videoKey);
        }}
      />
      <LessonTitle
        lessonOrder={lessonOrder}
        value={lesson.name}
        onChange={handleLessonTitleChange}
      />
      <Flex justifyContent="flex-end" w="100%" gap="2rem">
        <Flex alignItems="center" gap="0.5rem">
          <Text fontSize="0.75rem">Type</Text>
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
            onClick={() => handleLessonTypeChange(ICourseLessonType.assignment)}
          />
        </Flex>
        <Button
          variant="outline"
          leftIcon={isVideoUploaded ? <MdCheck color="green" /> : <MdAdd />}
          onClick={onOpenUploadVideoModal}
        >
          Video
        </Button>
      </Flex>
      <Divider />
    </Fragment>
  );
};

export default Lessons;
