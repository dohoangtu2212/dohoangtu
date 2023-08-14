import { extendTheme } from "@chakra-ui/react";
import DrawerStyles from "@/constants/theme/components/DrawerStyles";
import { COLORS } from "@/constants/theme/colors";

export const breakpoints = {
  sm: "360px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

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
  },
  defaultProps: {},
};

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
      tablist: {
        border: "none",
      },
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

const TextareaStyles = {
  variants: {
    outline: {
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
};

const CardStyles = {
  baseStyle: {
    bgColor: "red",
  },
  variants: {
    unstyled: {
      container: {
        background: "transparent",
      },
      header: {},
      body: {},
      footer: {},
    },
  },
};

const DividerStyles = {
  baseStyle: {
    borderColor: COLORS.summerBlue,
  },
};

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

const ModalStyles = {
  baseStyle: {
    dialog: {
      bgColor: COLORS.white,
    },
    header: {},
    body: {},
    footer: {},
    dialogContainer: {},
    closeButton: {
      color: COLORS.twilightBlue,
      fontSize: "0.875rem",
    },
    overlay: {},
  },
};

const MenuStyles = {
  baseStyle: {
    list: {},
    item: {},
    button: {},
    groupTitle: {},
    command: {},
    divider: {},
  },
  variants: {},
  defaultProps: {},
};

const PopoverStyles = {
  baseStyle: {
    content: {},
    header: {},
    body: {},
    footer: {},
    popper: {},
    arrow: {
      // bg: `${COLORS.white} !important`,
    },
    closeButton: {
      color: COLORS.twilightBlue,
      fontSize: "0.875rem",
    },
  },
  variants: {},
  defaultProps: {},
};

export const theme = extendTheme({
  // breakpoints,
  fonts: {
    body: "Quicksand, sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        bgColor: COLORS.white,
        color: COLORS.starryNightBlue,
      },
    },
  },
  components: {
    Button: ButtonStyles,
    Tabs: TabsStyles,
    Card: CardStyles,
    Input: InputStyles,
    Textarea: TextareaStyles,
    Divider: DividerStyles,
    Table: TableStyles,
    Modal: ModalStyles,
    Menu: MenuStyles,
    Popover: PopoverStyles,
    Drawer: DrawerStyles,
  },
});
