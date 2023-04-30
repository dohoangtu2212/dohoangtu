import { Box } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import type { FC } from "react";

type PageContainerProps = FlexProps & {};
const PageContainer: FC<PageContainerProps> = ({ children, ...flexProps }) => {
  return (
    <Box
      {...flexProps}
      p={{ base: "1.5rem 1rem", md: "1.75rem 6rem" }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
