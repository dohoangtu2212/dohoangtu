import { Flex, Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import type { FC } from "react";

type PageContainerProps = BoxProps & {};
const PageContainer: FC<PageContainerProps> = ({ children, ...boxProps }) => {
  return (
    <Flex
      p={{ base: "0.5rem 0.75rem", lg: "1rem 6rem" }}
      flexDir="column"
      alignItems="center"
    >
      <Box w="67.5rem" maxW="100%" {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageContainer;
