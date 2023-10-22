import { Flex, Box, Button, Spinner } from "@chakra-ui/react";
import { useMemo } from "react";
import Form from "@/views/Teacher/CoursesNew/Form";
import { useFormik } from "formik";
import { formikGetErrorMessages, formikGetIsDisabled } from "@/utils/formik";
import {
  ICourseChapter,
  ICourseFormValues,
  INewCourse,
  INewCourseDetails,
} from "@/types/course";
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
import { useUploadCourseThumbnailMutation } from "@/store/apis/storage";
import { ICourseLessonType } from "@/types/course";
import { COLORS } from "@/constants/theme/colors";
import useCustomToast from "@/hooks/useCustomToast";
import { reduce } from "lodash";

const INITIAL_VALUES: ICourseFormValues = {
  name: "",
  description: "",
  thumbnailUrl: "",
  overview: "",
  thumbnailFile: null,
  teacherName: "",
  hours: 0,
  lessons: 0,
  price: 0,
  previousPrice: 0,
  showInStore: false,
  chapters: [
    {
      order: 0,
      name: "Giới thiệu",
      sections: [
        {
          order: 0,
          name: "Giới thiệu",
          lessons: [
            {
              order: 1,
              name: "",
              type: ICourseLessonType.video,
              duration: 0,
              dyntubeKey: "",
            },
          ],
        },
      ],
    },
  ],
};

const getLessonsCount = (chapters: ICourseChapter[]) => {
  return reduce(
    chapters,
    (count, chapter) => {
      const { sections } = chapter;
      const lessonsCountInSections = reduce(
        sections,
        (lessonsCount, section) => {
          const { lessons } = section;
          return lessonsCount + lessons.length;
        },
        0
      );

      return lessonsCountInSections + count;
    },
    0
  );
};

const TeacherCoursesNew = () => {
  const editingCourse = useEditingCourseSelector();
  const toast = useCustomToast();
  const router = useRouter();

  // query
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

  // mutation
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
  const [uploadCourseThumbnail, { isLoading: uploadCourseThumbnailIsLoading }] =
    useUploadCourseThumbnailMutation();

  const initialValues = useMemo(() => {
    if (editingCourse && !!courseDetails && !!course) {
      return {
        name: courseDetails.name ?? "",
        description: courseDetails.description ?? "",
        thumbnailUrl: courseDetails.thumbnailUrl ?? "",
        teacherName: courseDetails.teacherName ?? "",
        overview: courseDetails.overview ?? "",
        hours: courseDetails.hours ?? 0,
        lessons: course?.lessons ?? 0,
        price: course.price ?? 0,
        previousPrice: course.previousPrice ?? 0,
        chapters: courseDetails.chapters ?? [],
        thumbnailFile: null,
        showInStore: course.showInStore ?? false,
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
      overview,
      price,
      chapters,
      previousPrice,
      showInStore = false,
    } = values;
    const courseDetailsData: INewCourseDetails = {
      name,
      description,
      thumbnailUrl,
      teacherName,
      hours,
      chapters,
      overview,
    };

    const lessonsCount = getLessonsCount(chapters);
    const courseData: INewCourse = {
      name,
      description,
      thumbnailUrl,
      teacherName,
      hours,
      lessons: lessonsCount,
      price,
      previousPrice,
      courseDetailsId: "",
      updatedAt: dayjs().toString(),
      showInStore,
      chapters: chapters.length,
    };

    try {
      if (isEditMode) {
        const { courseDetailsId, courseId } = editingCourse;
        let newThumbnailUrl = "";
        if (!!values.thumbnailFile) {
          const { url } = await uploadCourseThumbnail({
            file: values.thumbnailFile,
            filePath: courseId,
          }).unwrap();
          newThumbnailUrl = url;
        }
        const resUpdateCourseDetails = await updateCourseDetails({
          data: {
            ...courseDetailsData,
            thumbnailUrl: !!newThumbnailUrl
              ? newThumbnailUrl
              : courseDetailsData.thumbnailUrl,
          },
          courseDetailsId,
        }).unwrap();

        const resUpdateCourse = await updateCourse({
          data: {
            ...courseData,
            courseDetailsId,
            thumbnailUrl: !!newThumbnailUrl
              ? newThumbnailUrl
              : courseData.thumbnailUrl,
          },
          courseId,
        }).unwrap();
      } else {
        const resCreateCourseDetails = await createCourseDetails({
          data: { ...courseDetailsData, thumbnailFile: values.thumbnailFile },
        }).unwrap();
        const { id: newCourseDetailsId, thumbnailUrl } = resCreateCourseDetails;
        const resCreateCourse = await createCourse({
          data: {
            ...courseData,
            thumbnailUrl,
            courseDetailsId: newCourseDetailsId,
          },
        }).unwrap();
      }

      toast(
        `Khoá học "${name} đã được ${isEditMode ? "cập nhật" : "lưu"}."`,
        "success"
      );
      router.push(ROUTE.teacherCourses);
      resetForm();
    } catch (err) {
      toast(
        `${isEditMode ? "Cập nhật" : "Lưu"} khoá học không thành công.`,
        "error"
      );
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
    createCourseIsLoading ||
    createCourseDetailsLoading ||
    updateCourseIsLoading ||
    updateCourseDetailsIsLoading ||
    uploadCourseThumbnailIsLoading;

  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetCourseFetching ||
    isGetCourseLoading;

  return (
    <Flex flexDir="column" gap="2rem">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" gap="1rem">
          <Button leftIcon={<MdArrowBackIos />} onClick={handleGoBack}>
            Trở về
          </Button>
          {isLoading && <Spinner color={COLORS.twilightBlue} />}
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
