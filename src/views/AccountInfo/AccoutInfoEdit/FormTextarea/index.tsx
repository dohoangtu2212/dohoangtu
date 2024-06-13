import { Input, InputProps, Textarea, TextareaProps } from "@chakra-ui/react";
import { FC } from "react";

type FormTextareaProps = Omit<TextareaProps, "children"> & {
  disabled?: boolean;
};

const FormTextarea: FC<FormTextareaProps> = ({ disabled, ...inputProps }) => {
  return (
    <Textarea
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

export default FormTextarea;
