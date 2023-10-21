import { COLORS } from "../colors";

const InputStyles = {
  variants: {
    outline: {
      element: {
        color: COLORS.blueLapis,
        mx: "0.5rem",
      },
      field: {
        borderColor: COLORS.blueLapis,
        color: COLORS.starryNightBlue,
        _hover: {
          borderColor: COLORS.summerBlue,
          bgColor: COLORS.windmillWings,
        },
        _active: {},
        _focus: {
          bgColor: "transparent",
        },
        _placeholder: {
          color: COLORS.blueLapis,
        },
        _invalid: {},
        _autofill: {
          textFillColor: COLORS.starryNightBlue,
          boxShadow: `0 0 0px 1000px ${COLORS.whiteSatin} inset`,
          transition: "background-color 5000s ease-in-out 0s",
        },
      },
    },
    flushed: {
      element: {
        color: COLORS.blueLapis,
        mx: "0.5rem",
      },
      field: {
        borderColor: COLORS.blueLapis,
        color: COLORS.starryNightBlue,
        _hover: {
          borderColor: COLORS.summerBlue,
          bgColor: COLORS.windmillWings,
        },
        _active: {},
        _focus: {
          bgColor: "transparent",
        },
        _placeholder: {
          color: COLORS.blueLapis,
        },
        _invalid: {},
        _autofill: {
          textFillColor: COLORS.starryNightBlue,
          boxShadow: `0 0 0px 1000px ${COLORS.whiteSatin} inset`,
          transition: "background-color 5000s ease-in-out 0s",
        },
      },
    },
  },
};

export default InputStyles;
