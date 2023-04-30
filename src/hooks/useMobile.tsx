import { useBreakpoint } from "@chakra-ui/react";

const useMobile = () => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "base" || breakpoint === "sm";
  return { isMobile, breakpoint };
};

export default useMobile;
