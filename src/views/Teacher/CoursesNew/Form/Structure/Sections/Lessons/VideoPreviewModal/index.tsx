import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { FC } from "react";
import Video from "@/components/DynTube/Video";

type VideoPreviewModalProps = Omit<ModalProps, "children"> & {
  dynTubeKey: string;
};
const VideoPreviewModal: FC<VideoPreviewModalProps> = ({
  dynTubeKey,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent
        bgColor="red"
        w="fit-content"
        maxW="none"
        p="0"
        overflow="hidden"
      >
        <ModalBody p="0">
          <Video dynTubeKey={dynTubeKey} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoPreviewModal;
