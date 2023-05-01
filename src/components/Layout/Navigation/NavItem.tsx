import { Box, Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import type { FC } from "react";

type NavItemProps = ButtonProps & {};

const NavItem: FC<NavItemProps> = ({ children, ...buttonProps }) => {
  return (
    <Box>
      <Button
        variant="ghost"
        fontWeight="500"
        userSelect="none"
        fontSize="0.875rem"
        {...buttonProps}
      >
        {children}
      </Button>
    </Box>
  );
};

export default NavItem;
