import { useFormik } from "formik";
import type { AuthFormValues } from "@/types/auth";
import type { FC } from "react";
import { Flex, Input, Text, Button } from "@chakra-ui/react";
import PasswordInput from "@/components/Input/PasswordInput";
import { signInFormValidationSchema } from "@/constants/auth";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useMemo } from "react";

type FormProps = {
  onSubmit: (values: AuthFormValues) => Promise<void>;
  action: string;
};

const Form: FC<FormProps> = ({ onSubmit, action = "Đăng nhập" }) => {
  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInFormValidationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  const formErrorMessages = useMemo(
    () => formikGetErrorMessages(errors, touched),
    [errors, touched]
  );
  const formErrorMessage = formErrorMessages[0] ?? "";
  const isDisabled = useMemo(
    () => formikGetIsDisabled(errors, touched),
    [errors, touched]
  );

  return (
    <Flex flexDir="column" gap="2rem">
      <form onSubmit={handleSubmit} noValidate>
        <Flex flexDir="column" gap="1rem">
          <Input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <PasswordInput
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formErrorMessage && (
            <Text fontSize="0.875rem" textAlign="center" color="red.400">
              {formErrorMessage}
            </Text>
          )}
          <Button
            isLoading={isSubmitting}
            type="submit"
            isDisabled={isDisabled}
          >
            {action}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Form;
