import {
  Drawer,
  DrawerContent,
  DrawerBody,
  Flex,
  IconButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";
import useMobile from "@/hooks/useMobile";
import { AiOutlineMenu } from "react-icons/ai";
import { FC, PropsWithChildren, useState } from "react";

type NavigatorsContainerProps = PropsWithChildren & {
  isMinimized?: boolean;
};

const NavigatorsContainer: FC<NavigatorsContainerProps> = ({ children }) => {
  const { isMobile } = useMobile();
  const [showMenu, setShowMenu] = useState(false);

  if (!isMobile) {
    return (
      <Flex alignItems="center" gap="1rem">
        {children}
      </Flex>
    );
  }

  return (
    <>
      <IconButton
        aria-label="menu"
        icon={<AiOutlineMenu size="1.5rem" />}
        onClick={() => setShowMenu(true)}
      />
      <Drawer
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton size="1.5rem" top="1.5rem" right="1.5rem" />
          </DrawerHeader>
          <DrawerBody>
            <Flex gap="1em" flexDir="column" onClick={() => setShowMenu(false)}>
              {children}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavigatorsContainer;
