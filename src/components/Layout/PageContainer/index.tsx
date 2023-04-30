import { Flex } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import type { FC } from "react";

type PageContainerProps = FlexProps & {};
const PageContainer: FC<PageContainerProps> = ({ children, ...flexProps }) => {
  return (
    <Flex {...flexProps} p={{ base: "0.25rem 0.5rem", md: "1rem 2rem" }}>
      {children}
    </Flex>
  );
};

export default PageContainer;
