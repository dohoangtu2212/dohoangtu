import { COLORS } from "../colors";

const ButtonStyles = {
  baseStyle: {
    p: "0.25rem 1rem",
    minH: "none",
    minW: "none",
    h: "fit-content",
    w: "fit-content",
    borderRadius: "1rem",
  },
  variants: {
    ghost: {
      fontSize: "0.875rem",
      color: COLORS.starryNightBlue,
      _hover: {
        bgColor: COLORS.summerBlue,
        color: COLORS.midnightNavy,
      },
    },
    solid: {
      fontSize: "0.875rem",
      bgColor: COLORS.twilightBlue,
      borderColor: COLORS.twilightBlue,
      color: COLORS.whiteSatin,
      _hover: {
        bgColor: COLORS.summerBlue,
        color: COLORS.midnightNavy,
      },
    },
    outline: {
      fontSize: "0.875rem",
      borderColor: COLORS.twilightBlue,
      color: COLORS.twilightBlue,
      _hover: {
        bgColor: COLORS.summerBlue,
        color: COLORS.midnightNavy,
      },
    },
    text: {
      fontSize: "0.875rem",
      color: COLORS.twilightBlue,
    },
  },
  defaultProps: {},
};

export default ButtonStyles;
