import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

type NavigateButtonProps = ButtonProps & {};
const NavigateButton: FC<NavigateButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <Button
      fontSize={{ base: "0.75rem", lg: "0.875rem" }}
      p={{ base: "0.5rem", lg: "0.5rem 0.75rem" }}
      w="fit-content"
      h="fit-content"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default NavigateButton;
