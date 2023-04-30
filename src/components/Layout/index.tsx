import useAuthenticate from "@/hooks/useAuthenticate";
import { PropsWithChildren } from "react";
import { FC } from "react";
import Topbar from "@/components/Layout/Topbar";
import { Flex } from "@chakra-ui/react";

type LayoutProps = PropsWithChildren & {};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { authenticated } = useAuthenticate();

  return (
    <Flex flexDir="column" position="relative" minH="100vh">
      <Topbar authenticated={authenticated} />
      <main>{children}</main>
    </Flex>
  );
};

export default Layout;
