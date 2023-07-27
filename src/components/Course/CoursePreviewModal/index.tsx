import {
  ICourseDetails,
  ICourseLesson,
  ICourseLessonType,
} from "@/types/course";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { FC, useState, useMemo, useEffect } from "react";
import Video from "@/components/DynTube/Video";
import { filter, flattenDeep, map, slice } from "lodash";
import CourseLesson from "@/components/Course/CourseLesson";

type CoursePreviewModalProps = Omit<ModalProps, "children"> & {
  courseDetails: ICourseDetails;
};
const CoursePreviewModal: FC<CoursePreviewModalProps> = ({
  courseDetails,
  ...modalProps
}) => {
  const [selectedLesson, setSelectedLesson] = useState<ICourseLesson | null>(
    null
  );
  const { name } = courseDetails;

  const previewlessons = useMemo(() => {
    if (!courseDetails) return [];
    const { sections } = courseDetails;
    const parsedLessons = filter(
      flattenDeep(map(sections, (sec) => sec.lessons)),
      (le) => !!le
    );
    const lessonsWithVideo = filter(
      parsedLessons,
      (le: ICourseLesson) => le.type === ICourseLessonType.video
    );
    return slice(lessonsWithVideo, 0, 4);
  }, [courseDetails]);
  const noPreviewLessons = !previewlessons.length;

  const handleEndVideo = () => {};

  useEffect(() => {
    setSelectedLesson(previewlessons[0]);
  }, [previewlessons]);

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent maxW="none" w="40rem">
        <ModalCloseButton />
        <ModalHeader>
          <Flex flexDir="column" gap="0.5rem">
            <Text fontSize="0.875rem" fontWeight="300">
              Bản xem thử
            </Text>
            <Text fontWeight="600" fontSize="1rem">
              {name}
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          {noPreviewLessons ? (
            <Text textAlign="center">Không có bản xem thử</Text>
          ) : (
            <Flex flexDir="column" gap="2rem">
              <Box>
                {!!selectedLesson?.dyntubeKey && (
                  <Video
                    dynTubeKey={selectedLesson?.dyntubeKey}
                    w="100%"
                    minH={{ base: "fit-content", md: "20rem" }}
                    onEnded={handleEndVideo}
                  />
                )}
              </Box>
              <Flex flexDir="column" gap="0.5rem">
                {previewlessons.map((lesson) => {
                  const handleClick = () => {
                    setSelectedLesson(lesson);
                  };
                  const isActive =
                    selectedLesson?.dyntubeKey === lesson.dyntubeKey;
                  return (
                    <CourseLesson
                      key={lesson.dyntubeKey}
                      lesson={lesson}
                      onClick={handleClick}
                      isActive={isActive}
                    />
                  );
                })}
              </Flex>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CoursePreviewModal;
