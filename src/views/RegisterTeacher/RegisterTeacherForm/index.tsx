import { useFormik } from "formik";
import type { RegisterTeacherFormValues } from "@/types/auth";
import type { FC } from "react";
import { Flex, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useMemo, useState } from "react";
import FormInput from "@/views/AccountInfo/AccoutInfoEdit/FormInput";
import { registerFormValidationSchema } from "@/constants/auth";
import useCustomToast from "@/hooks/useCustomToast";
import AutoCompleteSelect from "@/components/Input/AutoCompleteSelect";
import { EPositionType, IRegisterTeacherReq } from "@/types/registerTeacher";
import { useCreateTeacherRegisterMutation } from "@/store/apis/register-teacher";

type FormProps = {};

const RegisterTeacherForm: FC<FormProps> = ({}) => {
  const [createTeacherRegister, { isLoading: isCreateTeacherRegisterLoading }] =
    useCreateTeacherRegisterMutation();
  const options = [
    { label: "Giáo viên chính", value: EPositionType.Teacher },
    { label: "Trợ giảng", value: EPositionType.Tutors },
  ];
  const toast = useCustomToast();
  const formik = useFormik<RegisterTeacherFormValues>({
    initialValues: {
      email: "",
      fullName: "",
      isPhoneNumber: false,
      phoneNumber: "",
      culturalLeveling: "",
      yearsOfExperience: 0,
      position: "",
      positionType: EPositionType.Other,
    },
    validationSchema: registerFormValidationSchema,
    onSubmit: async (values: any) => {
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
    resetForm,
    setFieldTouched,
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

  const onSubmit = async (values: RegisterTeacherFormValues) => {
    const req: IRegisterTeacherReq = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      culturalLeveling: values.culturalLeveling,
      yearsOfExperience: values.yearsOfExperience,
      position: values.position,
      positionType: values.positionType,
    };
    const res = await createTeacherRegister(req).unwrap();
    if (res.success) {
      resetForm();
      toast("Đăng ký thành công!", "success");
      formik.setFieldValue("positionType", EPositionType.Other);
      formik.setFieldValue("position", "");
    }
  };

  return (
    <Flex flexDir="column" gap="2rem" py="1rem" w="100%">
      <form onSubmit={handleSubmit} noValidate>
        <Flex flexDir="column" w="full" gap="16px">
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
          <FormControl id="email" isRequired>
            <FormLabel width="200px">Email</FormLabel>
            <FormInput
              name="email"
              placeholder="your-email@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormControl id="phoneNumber" isRequired>
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
          <Flex flexDir={{ base: "column", md: "row" }} gap="16px">
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
          <FormControl id="position" isRequired>
            <FormLabel width="200px">Vị trí</FormLabel>
            <AutoCompleteSelect
              options={options.map((item) => item.label)}
              value={values.position}
              onChangeValue={(value: string) => {
                const filter = options.filter((ele) => ele.label == value);
                formik.setFieldValue(
                  "positionType",
                  filter.length > 0 ? filter[0].value : EPositionType.Other
                );
                formik.setFieldValue("position", value);
                setFieldTouched("type");
              }}
              placeholder="Trợ giảng, Giáo viên chính, khác,.."
            />
          </FormControl>

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
              Đăng ký ngay
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default RegisterTeacherForm;
