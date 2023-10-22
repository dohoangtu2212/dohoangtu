import {
  Flex,
  Text,
  IconButton,
  Divider,
  InputProps,
  Tooltip,
  Box,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { FC, Fragment, useState } from "react";
import {
  MdOndemandVideo,
  MdAssignment,
  MdOutlineDelete,
  MdAddCircleOutline,
} from "react-icons/md";
import { ICourseLesson, ICourseLessonType } from "@/types/course";
import LessonTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/LessonTitle";
import VideoPreviewModal from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/VideoPreviewModal";
import Link from "next/link";

const LESSON_TYPES = Object.values(ICourseLessonType);

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

  const handleLessonLinksChange = (links: string[]) => {
    onLessonChange?.({
      ...lesson,
      links,
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
          <Flex alignItems="center" gap="0.5rem">
            <Text fontWeight="700">Phân loại:</Text>
            <Button
              aria-label="video"
              variant="text"
              bgColor={isVideoLesson ? "green.400" : "transparent"}
              leftIcon={<MdOndemandVideo />}
              onClick={() => handleLessonTypeChange(ICourseLessonType.video)}
            >
              Video
            </Button>
            <Button
              aria-label="video"
              variant="text"
              bgColor={!isVideoLesson ? "green.400" : "transparent"}
              leftIcon={<MdAssignment />}
              onClick={() =>
                handleLessonTypeChange(ICourseLessonType.assignment)
              }
            >
              Trắc nghiệm
            </Button>
          </Flex>
          <Box pt="1rem">
            {isVideoLesson && (
              <VideoLesson
                videoKey={lesson.dyntubeKey}
                onVideoKeyChange={handleChangeVideoKey}
              />
            )}
          </Box>
          <Divider />
          <Links
            links={lesson.links ?? []}
            onLinksChange={handleLessonLinksChange}
          />
        </Flex>
      </Flex>
      <Divider />
    </Fragment>
  );
};

interface LinksProps {
  links: string[];
  onLinksChange: (links: string[]) => void;
}
const Links: FC<LinksProps> = ({ links = [], onLinksChange }) => {
  const [tmpLinks, setTmpLinks] = useState<string[]>([]);

  return (
    <Flex flexDir="column" w="100%" gap="0.5rem">
      <Flex alignItems="center" gap="0.5rem">
        <Text fontWeight="700">Links</Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          px="0.5rem"
          borderRadius="md"
          bgColor="gray.300"
        >
          <Text>
            {links.length}
            {!!tmpLinks.length ? `+${tmpLinks.length}` : ""}
          </Text>
        </Flex>
        <IconButton
          p="0"
          variant="text"
          icon={<MdAddCircleOutline size="1.25rem" />}
          aria-label="add-link"
          onClick={() => setTmpLinks((pre) => [...pre, ""])}
        />
      </Flex>
      <Flex flexDir="column" gap="0.5rem">
        {links.map((link, idx) => {
          return (
            <Flex
              key={`link-${idx}`}
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href={link} passHref={true} target="_blank">
                <Text textDecoration="underline">{link}</Text>
              </Link>
              <IconButton
                p="0"
                aria-label="delete"
                icon={<MdOutlineDelete size="1.5rem" />}
                variant="text"
                onClick={() => onLinksChange(links.filter((li) => li !== link))}
              />
            </Flex>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="0.5rem">
        {tmpLinks.map((link, idx) => {
          return (
            <Flex key={`tmp-link-${idx}`} alignItems="center" gap="0.5rem">
              <Input
                value={link}
                onChange={(ev) => {
                  const val = ev.target.value;
                  setTmpLinks((pre) => {
                    const draft = [...pre];
                    draft[idx] = val;
                    return draft;
                  });
                }}
              />
              <IconButton
                p="0"
                aria-label="delete"
                icon={<MdOutlineDelete size="1.5rem" />}
                variant="text"
                onClick={() =>
                  setTmpLinks((pre) => {
                    const draft = [...pre];
                    draft.splice(idx, 1);
                    return draft;
                  })
                }
              />
            </Flex>
          );
        })}
      </Flex>
      {!!tmpLinks.length && (
        <Button
          onClick={() => {
            onLinksChange([...links, ...tmpLinks]);
            setTmpLinks([]);
          }}
        >
          Lưu links
        </Button>
      )}
    </Flex>
  );
};

interface VideoLessonProps {
  videoKey?: string;
  onVideoKeyChange?: (key: string) => void;
}
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
      <Flex alignItems="center" gap="1rem">
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

interface AssignmentLessonProps {}
const AssignmentLesson: FC<AssignmentLessonProps> = () => {
  return <Flex flexDir="column"></Flex>;
};

export default Lesson;
