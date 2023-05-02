import { Flex } from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import type { FC } from "react";
import { LAYER } from "@/constants/layer";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES } from "@/constants/route";

type TopbarContainerProps = FlexProps & {};

const TopbarContainer: FC<TopbarContainerProps> = ({
  children,
  ...flexProps
}) => {
  const router = useRouter();
  const { pathname } = router;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      as="header"
      padding={{ base: "0.75rem 1rem", md: "1rem 2rem" }}
      position="sticky"
      top="0"
      zIndex={LAYER.TOPBAR}
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export default TopbarContainer;
