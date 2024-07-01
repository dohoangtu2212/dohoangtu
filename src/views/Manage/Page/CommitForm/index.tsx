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
import FileInputCustom, { FileType } from "@/components/Input/FileInputCustom";
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
      introVideo: undefined,
      introVideoName: "",
      introVideoUrl: "",
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
      formik.setFieldValue("introVideoName", data.introVideoName ?? "");
      formik.setFieldValue("introVideoUrl", data.introVideoUrl ?? "");
      formik.setFieldValue("thumbnailName", data.thumbnailName ?? "");
      formik.setFieldValue("thumbnailUrl", data.thumbnailUrl ?? "");

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
      introVideoName: values.introVideoName,
      introVideoUrl: values.introVideoUrl,
      thumbnail: values.thumbnail,
      thumbnailName: values.thumbnailName,
      thumbnailUrl: values.thumbnailUrl,
      commits: values.commits,
      // old data
      introduceTextFirst: data?.introduceTextFirst ?? "",
      introduceTextSecond: data?.introduceTextSecond ?? "",
      introduceTextThird: data?.introduceTextThird ?? "",
      description: data?.description ?? "",
      trialLearnLink: data?.trialLearnLink ?? "",
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
              <Box
                padding="16px"
                border="1px solid rgba(10, 11, 49, 0.10)"
                borderRadius="4px"
              >
                <Flex flexDir={{ base: "column", md: "row" }} gap="16px">
                  <FormControl id="introVideo" isRequired>
                    <FormLabel width="200px">Video</FormLabel>
                    <FileInputCustom
                      name={`introVideo`}
                      initialFileName={values.introVideoName}
                      initialFileUrl={values.introVideoUrl}
                      type={FileType.video}
                      placeholder="Tải video"
                      accept="video/*"
                      onChange={(file?: File, fileName?: string) => {
                        formik.setFieldValue(`introVideo`, file);
                        formik.setFieldValue(`introVideoName`, fileName ?? "");
                        setFieldTouched("type");
                      }}
                    />
                  </FormControl>
                  <FormControl id="thumbnail" isRequired>
                    <FormLabel width="200px">Thumbnail</FormLabel>
                    <FileInputCustom
                      name={`thumbnail`}
                      initialFileName={values.thumbnailName}
                      initialFileUrl={values.thumbnailUrl}
                      type={FileType.image}
                      placeholder="Tải hình ảnh"
                      accept="image/*"
                      onChange={(file?: File, fileName?: string) => {
                        formik.setFieldValue(`thumbnail`, file);
                        formik.setFieldValue(`thumbnailName`, fileName ?? "");
                        setFieldTouched("type");
                      }}
                    />
                  </FormControl>
                </Flex>
              </Box>

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
                              <FileInputCustom
                                name={`commits[${index}].image`}
                                initialFileName={commit.imageName}
                                initialFileUrl={commit.imageUrl}
                                type={FileType.image}
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
