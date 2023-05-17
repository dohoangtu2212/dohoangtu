import { extendTheme } from "@chakra-ui/react";

export const breakpoints = {
  sm: "360px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export const colors = {
  whiteSatin: "#D6E5F2",
  windmillWings: "#BBD2ED",
  summerBlue: "#92B3E0",
  blueLapis: "#6289C6",
  twilightBlue: "#355496",
  midnightNavy: "#333356",
  starryNightBlue: "#333F76",
};

export const theme = extendTheme({
  breakpoints,
  fonts: {
    body: "Montserrat, sans-serif",
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
