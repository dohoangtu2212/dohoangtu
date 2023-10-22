import { Button, Flex } from "@chakra-ui/react";
import { FC, Fragment, useCallback } from "react";
import {
  ICourseLesson,
  ICourseLessonType,
  ICourseSection,
} from "@/types/course";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Lesson from "./Lesson";
dayjs.extend(duration);

interface LessonsProps {
  section: ICourseSection;
  onLessonsChange: (lessons: ICourseLesson[]) => void;
}
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

export default Lessons;
