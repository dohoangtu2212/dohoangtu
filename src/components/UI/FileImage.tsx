import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import type { BoxProps } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import ImagePreviewModal from "@/views/Manage/Page/ImagePreviewModal";

type FileImageProps = BoxProps & {
  image?: File;
  imageUrl: string;
  imageName: string;
  onRemove?: () => void;
};
const FileImage: FC<FileImageProps> = ({
  image,
  imageUrl,
  imageName,
  onRemove,
  ...boxProps
}) => {
  const {
    isOpen: isPreviewModalOpen,
    onOpen: openPreviewModal,
    onClose: closePreviewModal,
  } = useDisclosure();
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (image) {
      if (!!previewUrl) URL.revokeObjectURL(previewUrl);

      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
    }
  }, [image, previewUrl]);

  return (
    <>
      <ImagePreviewModal
        previewUrl={image != null ? previewUrl : imageUrl}
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
      />
      <Box {...boxProps} position="relative">
        <Flex
          flexDir="row"
          bg="#F8FAFB"
          padding="12px 30px 12px 12px"
          border="1px solid #F3F5F7"
          borderRadius="8px"
          gap="12px"
          cursor="pointer"
          onClick={openPreviewModal}
        >
          <Flex
            border="2px solid #F1F3F6"
            padding="8px"
            bg="white"
            borderRadius="8px"
          >
            <Image
              src="/images/icon-file-image.png"
              alt=""
              width={20}
              height={20}
            />
          </Flex>
          <Text fontSize="0.75rem" fontWeight="700">
            {image != null ? image.name : imageName}
          </Text>
        </Flex>
        <Box
          position="absolute"
          top="6px"
          right="6px"
          padding="6px"
          cursor="pointer"
          onClick={onRemove}
        >
          <MdClose size="0.875rem" />
        </Box>
      </Box>
    </>
  );
};

export default FileImage;
