import Actions from "@/components/Layout/Topbar/Actions";
import Navigators from "./Navigators";
import TopbarContainer from "@/components/Layout/TopbarContainer";
import type { FC } from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "@/components/Layout/Topbar/Cart";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";

type TopbarProps = {};
const Topbar: FC<TopbarProps> = () => {
  const userRole = useUserRoleSelector();
  const showCart = userRole !== UserRole.teacher;

  return (
    <TopbarContainer>
      <Navigators />
      <Flex alignItems="center" gap="1rem">
        {showCart && <Cart />}
        <Actions />
      </Flex>
    </TopbarContainer>
  );
};

export default Topbar;
