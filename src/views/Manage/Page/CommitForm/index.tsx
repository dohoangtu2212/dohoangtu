import { FieldArray, FormikProvider, useFormik } from "formik";
import type { FC } from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Text,
  Box,
} from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useEffect, useMemo } from "react";
import FormInput from "@/views/AccountInfo/AccoutInfoEdit/FormInput";
import useCustomToast from "@/hooks/useCustomToast";
import {
  CommitFormValues,
  ICommit,
  IManagePageReq,
  IManagePageRes,
} from "@/types/managePage";
import { commitFormValidationSchema } from "@/constants/manage-page";
import FileImageInput from "@/components/Input/FileImageInput";
import { useUpdateCommitMutation } from "@/store/apis/db";

type FormProps = {
  data: IManagePageRes | null;
};

const CommitForm: FC<FormProps> = ({ data }) => {
  const toast = useCustomToast();
  const [updateCommit, { isLoading: isUpdateCommitLoading }] =
    useUpdateCommitMutation();

  const formik = useFormik<CommitFormValues>({
    initialValues: {
      introVideo: "",
      commits: [
        { title: "", image: undefined, imageUrl: "", imageName: "" },
        { title: "", image: undefined, imageUrl: "", imageName: "" },
        { title: "", image: undefined, imageUrl: "", imageName: "" },
      ],
    },
    validationSchema: commitFormValidationSchema,
    onSubmit: async (values: any) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    if (data && formik) {
      formik.setFieldValue("introVideo", data.introVideo ?? "");
      if (data.commits?.length > 0) {
        formik.setFieldValue("commits", data.commits);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldTouched,
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

  const onSubmit = async (values: CommitFormValues) => {
    const req: IManagePageReq = {
      introVideo: values.introVideo,
      commits: values.commits,
      // old data
      introduceTextFirst: data?.introduceTextFirst ?? "",
      introduceTextSecond: data?.introduceTextSecond ?? "",
      introduceTextThird: data?.introduceTextThird ?? "",
      description: data?.description ?? "",
      lessons: data?.lessons ?? [],
      reviews: data?.reviews ?? [],
    };

    try {
      const res = await updateCommit(req).unwrap();
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
              <FormControl id="introVideo" isRequired>
                <FormLabel width="200px">Đường dẫn Video</FormLabel>
                <FormInput
                  name="introVideo"
                  placeholder="Nhập đường dẫn Video"
                  value={values.introVideo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FieldArray
                name="commits"
                render={(arrayHelpers: any) => (
                  <>
                    {formik.values.commits.map(
                      (commit: ICommit, index: number) => (
                        <Box
                          key={index}
                          padding="16px"
                          border="1px solid rgba(10, 11, 49, 0.10)"
                          borderRadius="4px"
                        >
                          <Flex
                            flexDir={{ base: "column", md: "row" }}
                            gap="16px"
                          >
                            <FormControl
                              id={`commits[${index}].title`}
                              isRequired
                            >
                              <FormLabel width="200px">Tiêu đề</FormLabel>
                              <FormInput
                                name={`commits[${index}].title`}
                                placeholder="Nhập tiêu đề"
                                value={formik.values.commits[index].title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                            <FormControl
                              id={`commits[${index}].image`}
                              isRequired
                            >
                              <FormLabel width="200px">Hình ảnh</FormLabel>
                              <FileImageInput
                                name={`commits[${index}].image`}
                                imageName={commit.imageName}
                                imageUrl={commit.imageUrl}
                                placeholder="Tải hình ảnh"
                                accept="image/*"
                                onChange={(file?: File, fileName?: string) => {
                                  formik.setFieldValue(
                                    `commits[${index}].image`,
                                    file
                                  );
                                  formik.setFieldValue(
                                    `commits[${index}].imageName`,
                                    fileName ?? ""
                                  );
                                  setFieldTouched("type");
                                }}
                              />
                            </FormControl>
                          </Flex>
                        </Box>
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

export default CommitForm;
