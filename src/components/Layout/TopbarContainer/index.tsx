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
      padding={{ base: "0.75rem 1rem", md: "1rem 2rem" }}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export default TopbarContainer;
