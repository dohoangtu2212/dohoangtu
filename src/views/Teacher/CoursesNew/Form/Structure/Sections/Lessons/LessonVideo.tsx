import { Flex, Text, useDisclosure, Button, Input } from "@chakra-ui/react";
import { FC } from "react";
import VideoPreviewModal from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons/VideoPreviewModal";

interface LessonVideoProps {
  videoKey?: string;
  onVideoKeyChange?: (key: string) => void;
}
const LessonVideo: FC<LessonVideoProps> = ({ videoKey, onVideoKeyChange }) => {
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

export default LessonVideo;
