import { Flex, Box, IconButton } from "@chakra-ui/react";
import DisplayImage from "@/components/UI/DisplayImage";
import { FC, useState } from "react";
import { DEFAULT_COURSE_THUMBNAIL } from "@/constants/course";
import { MdPlayArrow } from "react-icons/md";

type PlayableThumbnailProps = { thumbnailUrl?: string; onPlay?: () => void };
const PlayableThumbnail: FC<PlayableThumbnailProps> = ({
  thumbnailUrl,
  onPlay,
}) => {
  return (
    <Box position="relative" borderRadius="md" overflow="hidden">
      <Flex
        position="absolute"
        w="100%"
        h="100%"
        bgColor="blackAlpha.500"
        zIndex="10"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          aria-label="play"
          borderRadius="50%"
          w="3rem"
          h="3rem"
          p="0"
          icon={<MdPlayArrow size="1.75rem" />}
          onClick={onPlay}
        />
      </Flex>
      <DisplayImage
        imageUrl={!!thumbnailUrl ? thumbnailUrl : DEFAULT_COURSE_THUMBNAIL}
        w="100%"
        h="10rem"
        alt="thumbnail"
        border="1px"
        borderColor="gray.300"
      />
    </Box>
  );
};

export default PlayableThumbnail;
