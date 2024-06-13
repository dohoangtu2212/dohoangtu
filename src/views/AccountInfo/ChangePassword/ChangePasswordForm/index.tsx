import { useFormik } from "formik";
import type { ChangePasswordFormValues } from "@/types/auth";
import type { FC } from "react";
import { Flex, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useMemo } from "react";
import FormInput from "../../AccoutInfoEdit/FormInput";
import {
  CustomErrorCodes,
  changePasswordFormValidationSchema,
} from "@/constants/auth";
import useCustomToast from "@/hooks/useCustomToast";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  AuthError,
} from "firebase/auth";

type FormProps = {};

const ChangePasswordForm: FC<FormProps> = ({}) => {
  const auth = getAuth();
  const toast = useCustomToast();
  const formik = useFormik<ChangePasswordFormValues>({
    initialValues: {
      password: "",
      oldPassword: "",
      rePassword: "",
    },
    validationSchema: changePasswordFormValidationSchema,
    onSubmit: async (values) => {
      await onChangePassword(values);
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
    resetForm,
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

  const onChangePassword = async (values: ChangePasswordFormValues) => {
    const user = auth.currentUser;
    let credential = EmailAuthProvider.credential(
      user?.email ?? "",
      values.oldPassword ?? ""
    );

    if (user && values.password) {
      reauthenticateWithCredential(user, credential)
        .then(function () {
          updatePassword(user, values.password);
          toast("Thay đổi mật khẩu thành công!", "success");
          resetForm();
        })
        .catch(function (err) {
          console.log("err: ", err);
          const { code } = err as AuthError;
          let message = "Đã xảy ra lỗi.";

          if (code === CustomErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            message = "Mật khẩu cũ không hợp lệ.";
          }
          if (code === CustomErrorCodes.TOO_MANY_REQUESTS) {
            message = "Bạn thao tác quá nhiều, Vui lòng thử lại sau.";
          }
          toast(message, "error");
        });
    }
  };

  return (
    <Flex flexDir="column" gap="2rem" py="1rem" w="100%">
      <form onSubmit={handleSubmit} noValidate>
        <Flex flexDir="column" w="full" gap="16px">
          <Flex flexDir="row" gap="16px">
            <FormControl id="oldPassword" isRequired>
              <FormLabel width="200px">Mật khẩu cũ</FormLabel>
              <FormInput
                name="oldPassword"
                placeholder="Nhập mật khẩu cũ"
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </FormControl>
          </Flex>
          <Flex flexDir="row" gap="16px">
            <FormControl id="password" isRequired>
              <FormLabel width="200px">Mật khẩu mới</FormLabel>
              <FormInput
                name="password"
                placeholder="Nhập mật khẩu mới"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </FormControl>
          </Flex>
          <Flex flexDir="row" gap="16px">
            <FormControl id="rePassword" isRequired>
              <FormLabel width="200px">Mật khẩu xác nhận</FormLabel>
              <FormInput
                name="rePassword"
                placeholder="Nhập mật khẩu xác nhận"
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </FormControl>
          </Flex>
          {formErrorMessage && (
            <Text fontSize="0.875rem" textAlign="center" color="red.400">
              {formErrorMessage}
            </Text>
          )}
          <Flex justifyContent="center" pt="16px">
            <Button
              w="200px"
              isLoading={isSubmitting}
              type="submit"
              isDisabled={isDisabled}
            >
              Đổi mật khẩu
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default ChangePasswordForm;
