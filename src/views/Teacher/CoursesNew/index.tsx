import { Flex, Box, Button, useToast } from "@chakra-ui/react";
import { useMemo } from "react";
import Form from "@/views/Teacher/CoursesNew/Form";
import { useFormik } from "formik";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import { ICourseFormValues } from "@/types/course";
import {
  useCreateCourseMutation,
  useCreateCourseDetailsMutation,
} from "@/store/apis/db";
import dayjs from "dayjs";
import { COURSE_DETAILS } from "@/mocks/course";
import { MdSave, MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";

const INITIAL_VALUES: ICourseFormValues = {
  name: "",
  description: "",
  thumbnailUrl: "",
  teacherName: "",
  hours: 0,
  lessons: 0,
  price: 0,
  sections: [],
};

const TeacherCoursesNew = () => {
  const toast = useToast({
    position: "bottom",
  });
  const router = useRouter();

  const [
    createCourse,
    { data: createCourseData, isLoading: createCourseIsLoading },
  ] = useCreateCourseMutation();
  const [
    createCourseDetails,
    { data: createCourseDetailsData, isLoading: createCourseDetailsLoading },
  ] = useCreateCourseDetailsMutation();

  const formik = useFormik<ICourseFormValues>({
    initialValues: INITIAL_VALUES,
    // validationSchema: signInFormValidationSchema,
    onSubmit: async (values) => {
      const {
        name,
        description,
        thumbnailUrl,
        teacherName,
        hours,
        lessons,
        price,
        sections,
      } = values;
      const resCreateCourseDetails = await createCourseDetails({
        data: {
          name,
          description,
          thumbnailUrl,
          teacherName,
          hours,
          sections,
        },
      }).unwrap();
      const { id: courseDetailsId } = resCreateCourseDetails;
      const resCreateCourse = await createCourse({
        data: {
          name,
          description,
          thumbnailUrl,
          teacherName,
          hours,
          lessons,
          price,
          updatedAt: dayjs().toString(),
          courseDetailsId,
        },
      });
      toast({
        title: "Thành công!",
        description: `Khoá học "${name} đã được lưu."`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
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

  const isLoading = createCourseIsLoading || createCourseDetailsLoading;

  return (
    <Flex h={{ base: "100%", md: "90vh" }} flexDir="column" gap="2rem">
      <Flex justifyContent="space-between">
        <Button
          isLoading={isLoading}
          leftIcon={<MdArrowBackIos />}
          onClick={handleGoBack}
        >
          Trở về
        </Button>
        <Button
          onClick={submitForm}
          isLoading={isLoading}
          isDisabled={isDisabled}
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
