import { useFormik } from "formik";
import type { AuthFormValues, SignUpFormValues } from "@/types/auth";
import type { FC } from "react";
import { Flex, Input, Text, Button } from "@chakra-ui/react";
import PasswordInput from "@/components/Input/PasswordInput";
import { signUpFormValidationSchema } from "@/constants/auth";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useMemo } from "react";

type FormProps = {
  onSubmit: (values: SignUpFormValues) => Promise<void>;
  action: string;
};

const SignUpForm: FC<FormProps> = ({ onSubmit, action = "Đăng nhập" }) => {
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      fullName: "",
      schoolName: "",
      address: "",
      email: "",
      password: "",
    },
    validationSchema: signUpFormValidationSchema,
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
    <Flex flexDir="column" gap="2rem" py="1rem" w="100%">
      <form onSubmit={handleSubmit} noValidate>
        <Flex flexDir="column" gap="1rem">
          <Input
            placeholder="Họ tên"
            type="text"
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            placeholder="Trường"
            type="text"
            id="schoolName"
            name="schoolName"
            value={values.schoolName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            placeholder="Địa chỉ"
            type="text"
            id="address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
          <Flex justifyContent="center">
            <Button
              w="100%"
              isLoading={isSubmitting}
              type="submit"
              isDisabled={isDisabled}
            >
              {action}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignUpForm;
