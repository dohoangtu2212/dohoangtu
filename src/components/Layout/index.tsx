import useAuthenticate from "@/hooks/useAuthenticate";
import { PropsWithChildren } from "react";
import { FC } from "react";
import Topbar from "@/components/Layout/Topbar";
import { Box, Flex } from "@chakra-ui/react";

type LayoutProps = PropsWithChildren & {};

const Layout: FC<LayoutProps> = ({ children }) => {
  useAuthenticate();
  return (
    <>
      <Flex flexDir="column" position="relative" maxH="100vh">
        <Topbar />
        <Box minH="100vh">
          <main>{children}</main>
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
