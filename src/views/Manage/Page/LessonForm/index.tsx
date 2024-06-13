import { FieldArray, FormikProvider, useFormik } from "formik";
import type { FC } from "react";
import { Flex, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useEffect, useMemo } from "react";
import FormInput from "@/views/AccountInfo/AccoutInfoEdit/FormInput";
import useCustomToast from "@/hooks/useCustomToast";
import {
  ILesson,
  IManagePageReq,
  IManagePageRes,
  LessonFormValues,
} from "@/types/managePage";
import { useUpdateLessonMutation } from "@/store/apis/db";
import { lessonFormValidationSchema } from "@/constants/manage-page";
import FormTextarea from "@/views/AccountInfo/AccoutInfoEdit/FormTextarea";

type FormProps = {
  data: IManagePageRes | null;
};

const LessonForm: FC<FormProps> = ({ data }) => {
  const toast = useCustomToast();
  const [updateLesson, { isLoading: isUpdateLessonLoading }] =
    useUpdateLessonMutation();

  const formik = useFormik<LessonFormValues>({
    initialValues: {
      lessons: [
        {
          title: "",
          description: "",
          videoUrl: "",
          videoMobileUrl: "",
        },
        {
          title: "",
          description: "",
          videoUrl: "",
          videoMobileUrl: "",
        },
        {
          title: "",
          description: "",
          videoUrl: "",
          videoMobileUrl: "",
        },
        {
          title: "",
          description: "",
          videoUrl: "",
          videoMobileUrl: "",
        },
      ],
    },
    validationSchema: lessonFormValidationSchema,
    onSubmit: async (values: any) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    if (data && formik) {
      if (data.lessons?.length > 0) {
        formik.setFieldValue("lessons", data.lessons);
      }
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

  const onSubmit = async (values: LessonFormValues) => {
    const req: IManagePageReq = {
      lessons: values.lessons,
      // old data
      introduceTextFirst: data?.introduceTextFirst ?? "",
      introduceTextSecond: data?.introduceTextSecond ?? "",
      introduceTextThird: data?.introduceTextThird ?? "",
      description: data?.description ?? "",
      introVideo: data?.introVideo ?? "",
      commits: data?.commits ?? [],
      reviews: data?.reviews ?? [],
    };

    try {
      const res = await updateLesson(req).unwrap();
      toast("Lưu thành công!", "success");
    } catch (err) {
      toast("Lưu không thành công", "error");
    }
  };

  return (
    <>
      <Flex flexDir="column" gap="2rem" py="1rem" w="100%">
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit} noValidate>
            <Flex flexDir="column" w="full" gap="16px">
              <FieldArray
                name="lessons"
                render={(arrayHelpers: any) => (
                  <>
                    {formik.values.lessons.map(
                      (lesson: ILesson, index: number) => (
                        <Flex
                          key={index}
                          padding="16px"
                          border="1px solid rgba(10, 11, 49, 0.10)"
                          borderRadius="4px"
                          gap="16px"
                          flexDir="column"
                        >
                          <Flex flexDir="row" gap="16px">
                            <FormControl
                              id={`lessons[${index}].title`}
                              isRequired
                            >
                              <FormLabel width="200px">Tiêu đề</FormLabel>
                              <FormInput
                                name={`lessons[${index}].title`}
                                placeholder="Nhập tiêu đề"
                                value={formik.values.lessons[index].title ?? ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Flex>
                          <Flex flexDir="row" gap="16px">
                            <FormControl
                              id={`lessons[${index}].description`}
                              isRequired
                            >
                              <FormLabel width="200px">Mô tả</FormLabel>
                              <FormTextarea
                                name={`lessons[${index}].description`}
                                placeholder="Nhập mô tả"
                                value={
                                  formik.values.lessons[index].description ?? ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Flex>
                          <Flex flexDir="row" gap="16px">
                            <FormControl
                              id={`lessons[${index}].videoUrl`}
                              isRequired
                            >
                              <FormLabel width="200px">
                                Đường dẫn Video
                              </FormLabel>
                              <FormInput
                                name={`lessons[${index}].videoUrl`}
                                placeholder="Nhập đường dẫn Video"
                                value={
                                  formik.values.lessons[index].videoUrl ?? ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                            <FormControl
                              id={`lessons[${index}].videoMobileUrl`}
                              isRequired
                            >
                              <FormLabel width="200px">
                                Đường dẫn Video Mobile
                              </FormLabel>
                              <FormInput
                                name={`lessons[${index}].videoMobileUrl`}
                                placeholder="Nhập đường dẫn Video"
                                value={
                                  formik.values.lessons[index].videoMobileUrl ??
                                  ""
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Flex>
                        </Flex>
                      )
                    )}
                  </>
                )}
              />
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
        </FormikProvider>
      </Flex>
    </>
  );
};

export default LessonForm;
