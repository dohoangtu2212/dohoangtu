import { Flex, Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import type { FC } from "react";

type PageContainerProps = BoxProps & {};
const PageContainer: FC<PageContainerProps> = ({ children, ...boxProps }) => {
  return (
    <Flex
      p={{ base: "1.5rem 1rem", md: "1rem 6rem" }}
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
