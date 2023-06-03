import { COLORS } from "@/constants/theme";
import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type ArrowDivProps = BoxProps & {};
const ArrowDiv: FC<ArrowDivProps> = ({ ...boxProps }) => {
  const { bgColor = COLORS.starryNightBlue } = boxProps;

  return (
    <Box
      bgColor={bgColor}
      h={{ base: "3rem", md: "6rem" }}
      w="fit-content"
      aspectRatio="5/4"
      position="relative"
      _after={{
        color: bgColor,
        borderLeft: { base: "1.5rem solid", md: "3rem solid" },
        borderTop: {
          base: "1.5rem solid transparent",
          md: "3rem solid transparent",
        },
        borderBottom: {
          base: "1.5rem solid transparent",
          md: "3rem solid transparent",
        },
        display: "inline-block",
        content: '""',
        position: "absolute",
        right: { base: "-1.5rem", md: "-3rem" },
      }}
      _before={{
        color: COLORS.white,
        borderLeft: {
          base: `1.5rem solid ${COLORS.white}`,
          md: `3rem solid ${COLORS.white}`,
        },
        borderTop: {
          base: `1.5rem solid transparent`,
          md: "3rem solid transparent",
        },
        borderBottom: {
          base: "1.5rem solid transparent",
          md: "3rem solid transparent",
        },
        display: "inline-block",
        content: '""',
        position: "absolute",
        left: "-1px",
      }}
      {...boxProps}
    ></Box>
  );
};

export default ArrowDiv;
