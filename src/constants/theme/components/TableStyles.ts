import { COLORS } from "../colors";

const TableStyles = {
  baseStyle: {
    thead: {
      borderColor: COLORS.summerBlue,
      tr: {
        borderColor: COLORS.summerBlue,
        th: {
          _hover: {},
          borderColor: COLORS.summerBlue,
        },
      },
    },
    tbody: {
      borderColor: COLORS.summerBlue,
      tr: {
        borderColor: COLORS.summerBlue,
        td: {
          _hover: {},
          borderColor: COLORS.summerBlue,
        },
      },
    },
    tr: {},
    td: {},
  },
  variants: {
    simple: {
      th: {},

      tbody: {
        tr: {},
      },
    },
  },
};

export default TableStyles;
