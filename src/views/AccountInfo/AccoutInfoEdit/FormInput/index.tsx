import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";

type FormInputProps = Omit<InputProps, "children"> & {
  disabled?: boolean;
};

const FormInput: FC<FormInputProps> = ({ disabled, ...inputProps }) => {
  return (
    <Input
      disabled={disabled}
      {...inputProps}
      sx={{
        ...inputProps.sx,
        "&::placeholder": {
          fontSize: ".875rem",
        },
      }}
      _placeholder={{ color: "gray.500" }}
    />
  );
};

export default FormInput;
