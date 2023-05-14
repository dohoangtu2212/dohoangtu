import { Flex, Box } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import type { FC } from "react";

type PageContainerProps = FlexProps & {};
const PageContainer: FC<PageContainerProps> = ({ children, ...flexProps }) => {
  return (
    <Flex
      p={{ base: "1.5rem 1rem", md: "0rem 6rem" }}
      flexDir="column"
      alignItems="center"
      {...flexProps}
    >
      <Box maxW="100rem" w="100%">
        {children}
      </Box>
    </Flex>
  );
};

export default PageContainer;
