import { Flex } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import type { FC } from "react";

type TopbarContainerProps = FlexProps & {};

const TopbarContainer: FC<TopbarContainerProps> = ({
  children,
  ...flexProps
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      as="header"
      padding={{ base: "0.75rem 1rem", md: "0.5rem 2rem" }}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="30"
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export default TopbarContainer;
