import { useFormik } from "formik";
import type { FC } from "react";
import { Flex, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useEffect, useMemo } from "react";
import FormInput from "@/views/AccountInfo/AccoutInfoEdit/FormInput";
import useCustomToast from "@/hooks/useCustomToast";
import { introductionFormValidationSchema } from "@/constants/manage-page";
import {
  IManagePageReq,
  IManagePageRes,
  IntroductionFormValues,
} from "@/types/managePage";
import { useUpdateIntroductionMutation } from "@/store/apis/db";

type FormProps = {
  data: IManagePageRes | null;
};

const IntroductionForm: FC<FormProps> = ({ data }) => {
  const toast = useCustomToast();
  const [updateIntroduction, { isLoading: isUpdateIntroductionLoading }] =
    useUpdateIntroductionMutation();

  const formik = useFormik<IntroductionFormValues>({
    initialValues: {
      introduceTextFirst: "",
      introduceTextSecond: "",
      introduceTextThird: "",
      description: "",
    },
    validationSchema: introductionFormValidationSchema,
    onSubmit: async (values: any) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    if (data && formik) {
      formik.setFieldValue("introduceTextFirst", data.introduceTextFirst ?? "");
      formik.setFieldValue(
        "introduceTextSecond",
        data.introduceTextSecond ?? ""
      );
      formik.setFieldValue("introduceTextThird", data.introduceTextThird ?? "");
      formik.setFieldValue("description", data.description ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

  const onSubmit = async (values: IntroductionFormValues) => {
    const req: IManagePageReq = {
      introduceTextFirst: values.introduceTextFirst,
      introduceTextSecond: values.introduceTextSecond,
      introduceTextThird: values.introduceTextThird,
      description: values.description,
      // old data
      introVideoName: data?.introVideoName ?? "",
      introVideoUrl: data?.introVideoUrl ?? "",
      commits: data?.commits ?? [],
      lessons: data?.lessons ?? [],
      reviews: data?.reviews ?? [],
    };
    try {
      const res = await updateIntroduction(req).unwrap();
      toast("Lưu thành công!", "success");
    } catch (err) {
      toast("Lưu không thành công", "error");
    }
  };

  return (
    <Flex flexDir="column" gap="2rem" py="1rem" w="100%">
      <form onSubmit={handleSubmit} noValidate>
        <Flex flexDir="column" w="full" gap="16px">
          <FormControl id="introduceTextFirst" isRequired>
            <FormLabel width="200px">Giới thiệu 1</FormLabel>
            <FormInput
              name="introduceTextFirst"
              placeholder="Nhập giới thiệu 1"
              value={values.introduceTextFirst}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormControl id="introduceTextSecond" isRequired>
            <FormLabel width="200px">Giới thiệu 2</FormLabel>
            <FormInput
              name="introduceTextSecond"
              placeholder="Nhập giới thiệu 2"
              value={values.introduceTextSecond}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormControl id="introduceTextThird" isRequired>
            <FormLabel width="200px">Giới thiệu 3</FormLabel>
            <FormInput
              name="introduceTextThird"
              placeholder="Nhập giới thiệu 3"
              value={values.introduceTextThird}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel width="200px">Mô tả</FormLabel>
            <FormInput
              name="description"
              placeholder="Nhập mô tả"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
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
              Lưu thay đổi
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default IntroductionForm;
