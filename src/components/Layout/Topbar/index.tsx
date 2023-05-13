import Actions from "@/components/Layout/Topbar/Actions";
import Navigators from "./Navigators";
import TopbarContainer from "@/components/Layout/TopbarContainer";
import type { FC } from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "@/components/Layout/Topbar/Cart";

type TopbarProps = {};
const Topbar: FC<TopbarProps> = () => {
  return (
    <TopbarContainer>
      <Navigators />
      <Flex alignItems="center" gap="1rem">
        <Cart />
        <Actions />
      </Flex>
    </TopbarContainer>
  );
};

export default Topbar;
