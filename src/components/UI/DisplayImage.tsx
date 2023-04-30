import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import type { BoxProps } from "@chakra-ui/react";

type DisplayImageProps = BoxProps & {
  imageUrl: string;
  alt: string;
};
const DisplayImage: FC<DisplayImageProps> = ({
  imageUrl,
  alt,
  ...boxProps
}) => {
  return (
    <Box position="relative" overflow="hidden" {...boxProps}>
      <Image loader={() => imageUrl} src={imageUrl} alt={alt} fill />
    </Box>
  );
};

export default DisplayImage;
