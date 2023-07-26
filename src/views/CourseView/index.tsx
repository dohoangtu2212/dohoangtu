import {
  Box,
  Flex,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import CourseSections from "@/views/CourseView/CourseSections";
import CourseMain from "@/views/CourseView/CourseMain";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ICourseLesson } from "@/types/course";
import { useRouter } from "next/router";
import {
  useGetCourseDetailsQuery,
  useGetStudentViewsCountQuery,
  useUpdateStudentCourseProgressMutation,
} from "@/store/apis/db";
import { MdArrowBackIos } from "react-icons/md";
import { useCurrentUserSelector } from "@/store/slices/user";
import { useGetStudentCoursesQuery } from "@/store/apis/db";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { filter, flatten, flattenDeep, map, slice } from "lodash";
import type { ICourseDetails, IDisabledLesson } from "@/types/course";
import { useGetCourseQuery } from "@/store/apis/db";
import AddToCartModal from "@/views/CourseView/AddToCartModal";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart";
import { ROUTE } from "@/constants/route";
import { COLORS } from "@/constants/theme";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const CourseView = () => {
  const [selectedLesson, setSelectedLesson] = useState<ICourseLesson | null>(
    null
  );
  const dispatch = useDispatch();
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const router = useRouter();
  const { query, pathname } = router;
  const courseId = query?.courseId as string;

  const [updateStudentCourseProgress] =
    useUpdateStudentCourseProgressMutation();
  const {
    isOpen: isAddToCartModalOpen,
    onOpen: openAddToCartModal,
    onClose: closeAddToCartModal,
  } = useDisclosure();

  const {
    data: course,
    isLoading: isGetCourseLoading,
    isFetching: isGetCourseFetching,
  } = useGetCourseQuery(!!courseId ? { id: courseId ?? "" } : skipToken);
  const {
    data: courseDetails,
    isLoading: isGetCourseDetailsLoading,
    isFetching: isGetCourseDetailsFetching,
  } = useGetCourseDetailsQuery(
    !!course
      ? {
          id: course.courseDetailsId,
        }
      : skipToken
  );
  const {
    data: studentCourses,
    isLoading: isGetStudentCoursesLoading,
    isFetching: isGetStudentCoursesFetching,
  } = useGetStudentCoursesQuery(
    !!currentUser
      ? {
          userId: currentUser?.uid ?? "",
        }
      : skipToken
  );

  // Preview mode
  // - Student not purchase
  // - Public users
  const isPublicUsers = !currentUser;
  const isUnauthorizedStudent =
    userRole === UserRole.student &&
    (!studentCourses?.length ||
      (!!studentCourses?.length &&
        !studentCourses?.find((c) => c.courseId === courseId)));
  const matchedStudentCourse = useMemo(() => {
    if (!studentCourses || !courseId || !course) return null;
    return studentCourses.find(
      (stCourse) =>
        stCourse.courseDetailsId === course.courseDetailsId &&
        stCourse.courseId === courseId
    );
  }, [studentCourses, course, courseId]);

  const {
    data: viewsCount,
    isLoading: isGetStudentViewsCountLoading,
    isFetching: isGetStudentViewsCountFetching,
  } = useGetStudentViewsCountQuery(
    !!currentUser && !isUnauthorizedStudent
      ? {
          studentId: currentUser.uid,
        }
      : skipToken
  );

  const courseVideoKeys = useMemo(() => {
    if (!courseDetails) return [];
    const { sections } = courseDetails;
    const parsedLessons = filter(
      flattenDeep(map(sections, (sec) => sec.lessons)),
      (le) => !!le
    );
    return map(parsedLessons, (le) => le.dyntubeKey);
  }, [courseDetails]);

  const handleSelectDisabledLesson = useCallback(() => {
    if (!course) return;
    openAddToCartModal();
  }, [course, openAddToCartModal]);

  const handleAddToCart = useCallback(() => {
    if (!course) return;
    dispatch(cartActions.addCourse(course));
    closeAddToCartModal();
    router.push(ROUTE.cart);
  }, [course, closeAddToCartModal, dispatch, router]);

  const moveToNextLesson = (
    selectedLesson: ICourseLesson,
    courseDetails: ICourseDetails
  ) => {
    const { order } = selectedLesson;
    const [sectionOrder, lessonOrder] = order.toString().split(".");

    const { sections } = courseDetails;
    const sectionIdx = sections.findIndex(
      (s) => s.order.toString() === sectionOrder.toString()
    );
    let section = sections[sectionIdx];
    if (!section) return;
    const lessonIdx = section.lessons.findIndex(
      (l) => l.order.toString() === lessonOrder.toString()
    );
    let nextLesson = section.lessons[lessonIdx + 1];
    if (!nextLesson) {
      section = sections[sectionIdx + 1];
      nextLesson = section.lessons[0];
    }

    setSelectedLesson({
      ...nextLesson,
      order: `${section.order}.${nextLesson.order}`,
    });
  };

  const updateCourseProgress = useCallback(async () => {
    if (
      !courseVideoKeys.length ||
      !viewsCount ||
      isUnauthorizedStudent ||
      !currentUser ||
      !matchedStudentCourse?.id
    )
      return;
    const courseViewedVideoKeys = courseVideoKeys.filter((key) =>
      Object.keys(viewsCount).includes(key)
    );
    const progress = Math.round(
      (courseViewedVideoKeys.length / courseVideoKeys.length) * 100
    );
    await updateStudentCourseProgress({
      studentId: currentUser.uid,
      studentCourseId: matchedStudentCourse.id,
      progress,
    }).unwrap();
  }, [
    courseVideoKeys,
    viewsCount,
    isUnauthorizedStudent,
    currentUser,
    matchedStudentCourse,
    updateStudentCourseProgress,
  ]);

  const handleCurrentVideoEnded = useCallback(() => {
    if (!selectedLesson || !courseDetails) return;
    moveToNextLesson(selectedLesson, courseDetails);
    updateCourseProgress();
    // Move to next lesson
  }, [selectedLesson, courseDetails, updateCourseProgress]);

  useEffect(() => {
    if (!!courseDetails && !!courseDetails.sections[0].lessons?.[0]) {
      const section = courseDetails.sections[0];
      const lesson = section.lessons[0];
      setSelectedLesson({
        ...lesson,
        order: `${section.order}.${lesson.order}`,
      });
    }
  }, [courseDetails]);

  const isPreviewMode = isPublicUsers || isUnauthorizedStudent;

  // For public view
  const disabledLessons: IDisabledLesson[] = useMemo(() => {
    if (!courseDetails) return [];
    if (!isPreviewMode) return [];
    const { sections } = courseDetails;
    const sectionOrderAndLessons = sections.map((s) =>
      flatten(s.lessons).map((l) => ({
        lessonOrder: l.order,
        sectionOrder: s.order,
      }))
    );
    return slice(flatten(sectionOrderAndLessons), 3);
  }, [isPreviewMode, courseDetails]);

  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetStudentCoursesLoading ||
    isGetStudentCoursesFetching ||
    isGetCourseLoading ||
    isGetCourseFetching ||
    isGetStudentViewsCountLoading ||
    isGetCourseDetailsFetching;

  if (isLoading)
    return (
      <Box p="1rem">
        <Spinner color={COLORS.twilightBlue} />
      </Box>
    );

  if (!courseId || !courseDetails)
    return (
      <Box p="1rem">
        <Text>Không tìm thấy khoá học này</Text>
      </Box>
    );

  if (!courseDetails) return null;

  return (
    <>
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={closeAddToCartModal}
        onAddToCart={handleAddToCart}
      />
      <Flex minH="100vh" flexDir="column" pt="1rem">
        <Flex px="2rem" alignItems="center" gap="0.5rem">
          <IconButton
            aria-label="back"
            icon={<MdArrowBackIos size="1.5rem" />}
            variant="ghost"
            p="0"
            onClick={() => router.back()}
          />
          <Text fontWeight="600">KHÓA: {courseDetails.name}</Text>
        </Flex>
        <Flex flexDir={{ base: "column", md: "row" }}>
          <Box flex="3">
            <CourseMain
              onVideoEnded={handleCurrentVideoEnded}
              courseDetails={courseDetails}
              selectedLesson={selectedLesson}
              disabledLessons={disabledLessons}
            />
          </Box>
          <Box flex="1">
            <CourseSections
              disabledLessons={disabledLessons}
              selectedLesson={selectedLesson}
              course={courseDetails}
              onLessonSelected={setSelectedLesson}
              onDisabledLessonSelected={handleSelectDisabledLesson}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default CourseView;
