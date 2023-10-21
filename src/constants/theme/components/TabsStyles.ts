import { COLORS } from "../colors";

const TabsStyles = {
  baseStyle: {
    root: {
      color: COLORS.starryNightBlue,
    },
    tab: {},
    tablist: {},
    tabpanels: {},
    tabpanel: {},
  },
  variants: {
    line: {
      root: {
        py: "0.5rem",
      },
      tab: {
        fontWeight: "600",
        borderColor: COLORS.summerBlue,
        color: COLORS.summerBlue,
        opacity: 0.7,
        _selected: {
          opacity: 1,
          borderColor: COLORS.blueLapis,
          color: COLORS.blueLapis,
        },
      },
      tablist: {},
      tabpanels: {},
      tabpanel: {},
    },
    enclosed: {
      root: {
        py: "0.5rem",
      },
      tab: {
        fontWeight: "600",
        borderBottomColor: COLORS.summerBlue,
        color: COLORS.summerBlue,
        opacity: 0.7,
        _selected: {
          opacity: 1,
          borderColor: COLORS.blueLapis,
          color: COLORS.blueLapis,
          borderBottomColor: "transparent",
        },
      },
      tablist: {
        border: "none",
      },
      tabpanels: {},
      tabpanel: {},
    },
  },
  defaultProps: {},
};

export default TabsStyles;
