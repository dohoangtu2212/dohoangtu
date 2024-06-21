import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalBody,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FC } from "react";

type ImagePreviewModalProps = Omit<ModalProps, "children"> & {
  previewUrl: string;
};
const ImagePreviewModal: FC<ImagePreviewModalProps> = ({
  previewUrl,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps} size="2xl">
      <ModalOverlay />

      <ModalContent
        w="fit-content"
        p="0"
        sx={{
          margin: 0,
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)!important",
        }}
      >
        <ModalBody
          p="0"
          width={{ base: "90vw", md: "70vw", xl: "70vh" }}
          height={{ base: "90vw", md: "70vw", xl: "70vh" }}
        >
          {!!previewUrl && (
            <Flex bg="#f6f8fa" borderRadius="1rem">
              <Image
                width={{ base: "90vw", md: "70vw", xl: "70vh" }}
                height={{ base: "90vw", md: "70vw", xl: "70vh" }}
                src={previewUrl}
                alt="bank"
                style={{
                  objectFit: "contain",
                }}
              />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImagePreviewModal;
