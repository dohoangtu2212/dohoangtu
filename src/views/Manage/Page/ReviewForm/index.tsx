import { FieldArray, FormikProvider, useFormik } from "formik";
import type { FC } from "react";
import { Flex, Button, Text, GridItem } from "@chakra-ui/react";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { useEffect, useMemo } from "react";
import useCustomToast from "@/hooks/useCustomToast";
import {
  IManagePageReq,
  IManagePageRes,
  ReviewFormValues,
} from "@/types/managePage";
import { reviewFormValidationSchema } from "@/constants/manage-page";
import { useUpdateReviewMutation } from "@/store/apis/db";
import DragDrop from "@/components/Input/DragDrop";
import FileImage from "@/components/UI/FileImage";

type FormProps = {
  data: IManagePageRes;
};

const defaultData = { image: undefined, imageUrl: "", imageName: "" };

const ReviewForm: FC<FormProps> = ({ data }) => {
  const toast = useCustomToast();
  const [updateReview, { isLoading: isUpdateReviewLoading }] =
    useUpdateReviewMutation();

  const formik = useFormik<ReviewFormValues>({
    initialValues: {
      reviews: [],
    },
    validationSchema: reviewFormValidationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  useEffect(() => {
    if (data && formik) {
      if (data.reviews?.length > 0) {
        formik.setFieldValue("reviews", data.reviews);
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

  const onSubmit = async (values: ReviewFormValues) => {
    const req: IManagePageReq = {
      reviews: values.reviews,
      // old data
      introduceTextFirst: data.introduceTextFirst,
      introduceTextSecond: data.introduceTextSecond,
      introduceTextThird: data.introduceTextThird,
      description: data.description,
      introVideo: data.introVideo,
      commits: data.commits,
      lessons: data.lessons,
    };

    try {
      const res = await updateReview(req).unwrap();
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
                name="reviews"
                render={(arrayHelpers) => (
                  <>
                    <Flex
                      flexDir="row"
                      gap={{ base: "32px", md: "32px", lg: "64px", xl: "64px" }}
                      flex="1 1 auto"
                    >
                      <DragDrop
                        onChange={(files) => {
                          Object.keys(files).forEach(function (key) {
                            const file = files[key];
                            arrayHelpers.push({
                              image: file,
                              imageUrl: "",
                              imageName: file.name,
                            });
                          });
                          setFieldTouched("type");
                        }}
                      />
                      <Flex
                        height="60vh"
                        width="flex: 1 1 auto"
                        sx={{ overflow: "scroll" }}
                        flexDir="column"
                        gap="16px"
                      >
                        {formik.values.reviews.map((review, index) => (
                          <GridItem key={index} w="100%">
                            <FileImage
                              image={review.image}
                              imageName={review.imageName ?? ""}
                              imageUrl={review.imageUrl ?? ""}
                              width={{
                                base: "250px",
                                md: "250px",
                                lg: "250px",
                                xl: "300px",
                              }}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                setFieldTouched("type");
                              }}
                            />
                          </GridItem>
                        ))}
                      </Flex>
                    </Flex>
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

export default ReviewForm;
