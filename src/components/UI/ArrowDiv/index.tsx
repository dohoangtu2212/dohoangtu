import { COLORS } from "@/constants/theme/colors";
import { Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

type ArrowDivProps = FlexProps & {};
const ArrowDiv: FC<ArrowDivProps> = ({ children, ...flexProps }) => {
  const { bgColor = COLORS.starryNightBlue } = flexProps;

  return (
    <Flex
      bgColor={bgColor}
      h={{ base: "3rem", md: "6rem", lg: "10rem" }}
      aspectRatio="5/4"
      position="relative"
      alignItems="center"
      justifyContent="center"
      _after={{
        color: bgColor,
        borderLeft: {
          base: "1.5rem solid",
          md: "3rem solid",
          lg: "5rem solid",
        },
        borderTop: {
          base: "1.5rem solid transparent",
          md: "3rem solid transparent",
          lg: "5rem solid transparent",
        },
        borderBottom: {
          base: "1.5rem solid transparent",
          md: "3rem solid transparent",
          lg: "5rem solid transparent",
        },
        display: "inline-block",
        content: '""',
        position: "absolute",
        right: { base: "-1.5rem", md: "-3rem", lg: "-5rem" },
      }}
      _before={{
        color: COLORS.white,
        borderLeft: {
          base: `1.5rem solid ${COLORS.white}`,
          md: `3rem solid ${COLORS.white}`,
          lg: `5rem solid ${COLORS.white}`,
        },
        borderTop: {
          base: `1.5rem solid transparent`,
          md: "3rem solid transparent",
          lg: `5rem solid transparent`,
        },
        borderBottom: {
          base: "1.5rem solid transparent",
          md: "3rem solid transparent",
          lg: "5rem solid transparent",
        },
        display: "inline-block",
        content: '""',
        position: "absolute",
        left: "-1px",
      }}
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export default ArrowDiv;
