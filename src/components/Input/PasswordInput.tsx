import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import type { FC } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

type PasswordInputProps = InputProps & {};
const PasswordInput: FC<PasswordInputProps> = ({ ...inputProps }) => {
  const [show, setShow] = useState(false);
  const handleToggleDisplay = () => setShow((pre) => !pre);

  return (
    <InputGroup>
      <Input
        placeholder="Mật khẩu"
        type={show ? "text" : "password"}
        {...inputProps}
      />
      <InputRightElement>
        <IconButton
          aria-label="show/hide"
          h="1.75rem"
          size="sm"
          onClick={handleToggleDisplay}
          variant="unstyled"
          icon={
            show ? (
              <AiOutlineEyeInvisible size="1.5rem" />
            ) : (
              <AiOutlineEye size="1.5rem" />
            )
          }
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
