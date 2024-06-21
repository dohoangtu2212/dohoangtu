import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import { FC } from "react";

type VideoPreviewModalProps = Omit<ModalProps, "children"> & {
  previewUrl: string;
};
const VideoPreviewModal: FC<VideoPreviewModalProps> = ({
  previewUrl,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent
        w="fit-content"
        maxW="none"
        p="0"
        overflow="hidden"
        sx={{
          margin: 0,
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)!important",
        }}
      >
        <ModalBody p="0">
          <Box
            width={{ base: "90vw", md: "70vw", xl: "70vh" }}
            bg="gray.200"
            overflow="hidden"
          >
            <video poster="/images/thumbnail.png" controls>
              <source src={previewUrl} type="video/mp4" />
            </video>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoPreviewModal;
