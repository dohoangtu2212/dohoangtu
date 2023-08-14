import { Flex } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import type { FC } from "react";
import { LAYER } from "@/constants/layer";
import { useRouter } from "next/router";
import { COLORS } from "@/constants/theme/colors";

type TopbarContainerProps = FlexProps & {};

const TopbarContainer: FC<TopbarContainerProps> = ({
  children,
  ...flexProps
}) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      as="header"
      padding={{ base: "0.75rem 1rem", md: "0.5rem 1.5rem" }}
      position="sticky"
      top="0"
      bgColor={COLORS.starryNightBlue}
      color={COLORS.whiteSatin}
      zIndex={LAYER.TOPBAR}
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export default TopbarContainer;
