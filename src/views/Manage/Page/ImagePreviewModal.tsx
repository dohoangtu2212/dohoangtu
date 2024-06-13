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
        <ModalBody p="0" width={700} height={700}>
          {!!previewUrl && (
            <Flex bg="black">
              <Image
                width={700}
                height={700}
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
