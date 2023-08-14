import { COLORS } from "@/constants/theme/colors";

const mobileMenuVariant = {
  dialog: {
    bgColor: COLORS.starryNightBlue,
  },
  closeButton: {
    color: COLORS.whiteSatin,
    fontSize: "0.875rem",
    _hover: {},
  },
  header: {
    bgColor: COLORS.starryNightBlue,
  },
  body: {
    bgColor: COLORS.starryNightBlue,
  },
  footer: {},
};

const DrawerStyles = {
  baseStyle: {},
  variants: {
    mobileMenu: mobileMenuVariant,
  },
  defaultProps: {
    size: "sm",
  },
};

export default DrawerStyles;
