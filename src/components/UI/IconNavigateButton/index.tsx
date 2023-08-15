import { IconButtonProps, IconButton } from "@chakra-ui/react";
import { FC, forwardRef } from "react";

type IconNavigateButtonProps = IconButtonProps & {};
const IconNavigateButton: FC<IconNavigateButtonProps> = forwardRef(
  ({ ...buttonProps }, ref) => {
    return (
      <IconButton
        ref={ref}
        w="fit-content"
        h="fit-content"
        p="0"
        minW="none"
        minH="none"
        variant="unstyle"
        {...buttonProps}
      />
    );
  }
);
IconNavigateButton.displayName = "IconNavigateButton";

export default IconNavigateButton;
