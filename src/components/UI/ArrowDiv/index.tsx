import { COLORS } from "@/constants/theme";
import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type ArrowDivProps = BoxProps & {};
const ArrowDiv: FC<ArrowDivProps> = ({ ...boxProps }) => {
  const { bgColor = COLORS.starryNightBlue } = boxProps;

  return (
    <Box
      bgColor={bgColor}
      h="6rem"
      w="fit-content"
      aspectRatio="5/4"
      position="relative"
      _after={{
        color: bgColor,
        borderLeft: "3rem solid",
        borderTop: "3rem solid transparent",
        borderBottom: "3rem solid transparent",
        display: "inline-block",
        content: '""',
        position: "absolute",
        right: "-3rem",
      }}
      _before={{
        color: COLORS.white,
        borderLeft: "3rem solid",
        borderTop: "3rem solid transparent",
        borderBottom: "3rem solid transparent",
        display: "inline-block",
        content: '""',
        position: "absolute",
        left: "0",
      }}
      {...boxProps}
    ></Box>
  );
};

export default ArrowDiv;
