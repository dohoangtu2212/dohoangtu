import { Flex, Box, Button, useToast, Spinner } from "@chakra-ui/react";
import { useMemo } from "react";
import Form from "@/views/Teacher/CoursesNew/Form";
import { useFormik } from "formik";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { ICourseDetails, ICourseFormValues, INewCourse, INewCourseDetails } from "@/types/course";
import {
  useCreateCourseMutation,
  useCreateCourseDetailsMutation,
  useGetCourseDetailsQuery,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useUpdateCourseDetailsMutation,
} from "@/store/apis/db";
import dayjs from "dayjs";
import { MdSave, MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { useEditingCourseSelector } from "@/store/slices/course";
import type { FormikConfig } from "formik";

const INITIAL_VALUES: ICourseFormValues = {
  name: "",
  description: "",
  thumbnailUrl: "",
  thumbnailFile: null,
  teacherName: "",
  hours: 0,
  lessons: 0,
  price: 0,
  previousPrice: 0,
  sections: [],
};

const TeacherCoursesNew = () => {
  const editingCourse = useEditingCourseSelector();
  const toast = useToast({
    position: "bottom",
  });
  const router = useRouter();

  // QUERY
  const {
    data: courseDetails,
    isLoading: isGetCourseDetailsLoading,
    isFetching: isGetCourseDetailsFetching,
  } = useGetCourseDetailsQuery(
    { id: editingCourse?.courseDetailsId ?? "" },
    { skip: !editingCourse?.courseDetailsId }
  );
  const {
    data: course,
    isLoading: isGetCourseLoading,
    isFetching: isGetCourseFetching,
  } = useGetCourseQuery(
    { id: editingCourse?.courseId ?? "" },
    { skip: !editingCourse?.courseId }
  );

  // MUTATION
  const [
    createCourse,
    { data: createCourseData, isLoading: createCourseIsLoading },
  ] = useCreateCourseMutation();
  const [
    createCourseDetails,
    { data: createCourseDetailsData, isLoading: createCourseDetailsLoading },
  ] = useCreateCourseDetailsMutation();
  const [
    updateCourse,
    { data: updateCourseData, isLoading: updateCourseIsLoading },
  ] = useUpdateCourseMutation();
  const [
    updateCourseDetails,
    { data: updateCourseDetailsData, isLoading: updateCourseDetailsIsLoading },
  ] = useUpdateCourseDetailsMutation();

  const initialValues = useMemo(() => {
    if (editingCourse && !!courseDetails && !!course) {
      return {
        name: courseDetails.name,
        description: courseDetails.description,
        thumbnailUrl: courseDetails.thumbnailUrl,
        teacherName: courseDetails.teacherName,
        hours: courseDetails.hours,
        lessons: course?.lessons,
        price: course.price,
        previousPrice: course.previousPrice,
        sections: courseDetails.sections ?? [],
        thumbnailFile: null,
      };
    }

    return INITIAL_VALUES;
  }, [course, courseDetails, editingCourse]);

  const handleSubmit: FormikConfig<ICourseFormValues>["onSubmit"] = async (
    values,
    { resetForm }
  ) => {
    const isEditMode = !!editingCourse;

    const {
      name,
      description,
      thumbnailUrl,
      teacherName,
      hours,
      lessons,
      price,
      sections,
      previousPrice,
    } = values;
    const courseDetailsData: INewCourseDetails = {
      name,
      description,
      thumbnailUrl,
      teacherName,
      hours,
      sections,
    };
    const courseData: INewCourse = {
      name,
      description,
      thumbnailUrl,
      teacherName,
      hours,
      lessons,
      price,
      previousPrice,
      updatedAt: dayjs().toString(),
    };

    try {
      if (isEditMode) {
        const { courseDetailsId, courseId } = editingCourse;
        const resUpdateCourseDetails = await updateCourseDetails({
          data: courseDetailsData,
          courseDetailsId,
        }).unwrap();
        const resUpdateCourse = await updateCourse({
          data: {
            ...courseData,
            courseDetailsId,
          },
          courseId,
        });
      } else {
        const resCreateCourseDetails = await createCourseDetails({
          data: courseDetailsData,
        }).unwrap();
        const { id: newCourseDetailsId } = resCreateCourseDetails;
        const resCreateCourse = await createCourse({
          data: {
            ...courseData,
            courseDetailsId: newCourseDetailsId,
          },
        });
      }

      toast({
        title: "Thành công!",
        description: `Khoá học "${name} đã được ${
          isEditMode ? "cập nhật" : "lưu"
        }."`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push(ROUTE.teacherCourses);
      resetForm();
    } catch (err) {
      toast({
        title: "Lỗi!",
        description: `${
          isEditMode ? "Cập nhật" : "Lưu"
        } khoá học không thành công.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const formik = useFormik<ICourseFormValues>({
    initialValues,
    enableReinitialize: true,
    // validationSchema: signInFormValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleGoBack = () => {
    router.push(ROUTE.teacherCourses);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    submitForm,
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

  const isSubmissionLoading =
    createCourseIsLoading || createCourseDetailsLoading;
  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetCourseFetching ||
    isGetCourseLoading;

  return (
    <Flex h={{ base: "100%", md: "90vh" }} flexDir="column" gap="2rem">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" gap="1rem">
          <Button
            isLoading={isSubmissionLoading}
            leftIcon={<MdArrowBackIos />}
            onClick={handleGoBack}
          >
            Trở về
          </Button>
          {isLoading && <Spinner color="orange.300" />}
        </Flex>
        <Button
          onClick={submitForm}
          isLoading={isSubmissionLoading}
          // isDisabled={isDisabled}
          leftIcon={<MdSave />}
        >
          Lưu
        </Button>
      </Flex>
      <Box flex="9">
        <Form
          values={values}
          handleSetFieldValue={setFieldValue}
          handleSetFieldTouched={setFieldTouched}
        />
      </Box>
    </Flex>
  );
};

export default TeacherCoursesNew;
