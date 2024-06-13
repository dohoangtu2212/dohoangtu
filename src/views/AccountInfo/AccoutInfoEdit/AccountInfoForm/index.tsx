import { useFormik } from "formik";
import type { AccountInfoFormValues } from "@/types/auth";
import type { FC } from "react";
import { Flex, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useEffect, useMemo, useState } from "react";
import FormInput from "../FormInput";
import { IBaseUser } from "@/types/user";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { UserRole } from "@/types/permission";
import { COLORS } from "@/constants/theme/colors";

type FormProps = {
  user: IBaseUser;
  onSubmit: (values: AccountInfoFormValues, birthday?: Date) => Promise<void>;
  validationSchema?: any;
};

const AccountInfoForm: FC<FormProps> = ({
  user,
  onSubmit,
  validationSchema,
}) => {
  const formik = useFormik<AccountInfoFormValues>({
    initialValues: {
      fullName: user.fullName ?? "",
      schoolName: user.schoolName ?? "",
      address: user.address ?? "",
      className: user.className ?? "",
      isPhoneNumber: false,
      phoneNumber: user.phoneNumber ?? "",
      culturalLeveling: user.culturalLeveling ?? "",
      yearsOfExperience: user.yearsOfExperience ?? 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values, birthday);
    },
  });
  const [birthday, setBirthday] = useState<Date | undefined>(
    user.birthday ?? undefined
  );

  useEffect(() => {
    if (user && formik) {
      formik.setFieldValue("fullName", user.fullName ?? "");
      formik.setFieldValue("schoolName", user.schoolName ?? "");
      formik.setFieldValue("address", user.address ?? "");
      formik.setFieldValue("className", user.className ?? "");
      formik.setFieldValue("phoneNumber", user.phoneNumber ?? "");
      setBirthday(user.birthday ?? undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
        <Flex flexDir="column" w="full" gap="16px">
          <Flex flexDir="row" gap="16px">
            <FormControl id="fullName" isRequired>
              <FormLabel width="200px">Họ tên</FormLabel>
              <FormInput
                name="fullName"
                placeholder="Nhập họ tên"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
            <FormControl id="birthday">
              <FormLabel width="200px">Ngày sinh</FormLabel>
              <Flex
                sx={{
                  "& button": {
                    w: "full",
                    borderRadius: "0.375rem",
                    fontSize: "md",
                    fontWeight: "400",
                    justifyContent: "left",
                    borderColor: COLORS.blueLapis,
                  },
                }}
              >
                <SingleDatepicker
                  name="birthday"
                  date={birthday && new Date(birthday)}
                  onDateChange={(date) => {
                    date && setBirthday(date);
                  }}
                  maxDate={new Date()}
                  configs={{
                    dateFormat: "dd/MM/yyyy",
                  }}
                />
              </Flex>
            </FormControl>
          </Flex>
          <Flex flexDir="row" gap="16px">
            <FormControl id="phoneNumber">
              <FormLabel width="200px">Số điện thoại</FormLabel>
              <FormInput
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                value={values.phoneNumber}
                onChange={(event) => {
                  handleChange(event);
                  formik.setFieldValue(
                    "isPhoneNumber",
                    event.target.value.length > 0
                  );
                }}
                onBlur={handleBlur}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel width="200px">Email</FormLabel>
              <FormInput
                name="email"
                placeholder="your-email@example.com"
                value={user.email ?? ""}
                disabled
                onChange={() => {}}
              />
            </FormControl>
          </Flex>
          {user.role === UserRole.student && (
            <Flex flexDir="row" gap="16px">
              <FormControl id="schoolName" isRequired>
                <FormLabel width="200px">Trường</FormLabel>
                <FormInput
                  name="schoolName"
                  placeholder="Nhập tên trường"
                  value={values.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl id="className">
                <FormLabel width="200px">Lớp</FormLabel>
                <FormInput
                  name="className"
                  placeholder="Nhập tên lớp"
                  value={values.className}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
            </Flex>
          )}
          {user.role === UserRole.teacher && (
            <Flex flexDir="row" gap="16px">
              <FormControl id="culturalLeveling" isRequired>
                <FormLabel width="200px">Trình độ</FormLabel>
                <FormInput
                  name="culturalLeveling"
                  placeholder="Nhập trình độ"
                  value={values.culturalLeveling}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl id="yearsOfExperience" isRequired>
                <FormLabel width="200px">Kinh nghiệm (năm)</FormLabel>
                <FormInput
                  name="yearsOfExperience"
                  placeholder="Nhập số năm"
                  value={values.yearsOfExperience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                />
              </FormControl>
            </Flex>
          )}
          <Flex flexDir="row" gap="16px">
            <FormControl id="address" isRequired>
              <FormLabel width="200px">Địa chỉ</FormLabel>
              <FormInput
                name="address"
                placeholder="Nhập địa chỉ"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
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
              Lưu thay đổi
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default AccountInfoForm;
