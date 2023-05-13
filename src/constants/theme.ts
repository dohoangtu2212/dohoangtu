import { extendTheme } from "@chakra-ui/react";

export const breakpoints = {
  sm: "360px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export const theme = extendTheme({
  breakpoints,
  fonts: {
    body: "Montserrat Alternates, sans-serif",
  },
  styles: {
    global: {
      "html, body": {},
    },
  },
  components: {
    Button: {
      defaultProps: {},
    },
    Tabs: {
      defaultProps: {},
    },
  },
});
