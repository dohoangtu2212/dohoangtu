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
import { useGetCourseDetailsQuery } from "@/store/apis/db";
import { MdArrowBackIos } from "react-icons/md";
import { useCurrentUserSelector } from "@/store/slices/user";
import { useGetStudentCoursesQuery } from "@/store/apis/db";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { flatten, slice } from "lodash";
import type { IDisabledLesson } from "@/types/course";
import { useGetCourseQuery } from "@/store/apis/db";
import AddToCartModal from "@/views/CourseView/AddToCartModal";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart";
import { ROUTE } from "@/constants/route";

const CourseView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query, pathname } = router;
  const courseId = query?.courseId as string;
  const {
    isOpen: isAddToCartModalOpen,
    onOpen: openAddToCartModal,
    onClose: closeAddToCartModal,
  } = useDisclosure();
  const {
    data: course,
    isLoading: isGetCourseLoading,
    isFetching: isGetCourseFetching,
  } = useGetCourseQuery({ id: courseId ?? "" }, { skip: !courseId });
  const {
    data: courseDetails,
    isLoading: isGetCourseDetailsLoading,
    isFetching: isGetCourseDetailsFetching,
  } = useGetCourseDetailsQuery(
    {
      id: (course?.courseDetailsId as string) ?? "",
    },
    { skip: !course?.courseDetailsId }
  );

  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const {
    data: studentCourses,
    isLoading: isGetStudentCoursesLoading,
    isFetching: isGetStudentCoursesFetching,
  } = useGetStudentCoursesQuery(
    {
      userId: currentUser?.uid ?? "",
    },
    {
      skip: !currentUser?.uid || userRole !== UserRole.student,
    }
  );

  // Preview mode
  // - Student not purchase
  // - Public users
  const isPublicUsers = !currentUser;
  const isUnauthorizedStudent =
    userRole === UserRole.student &&
    (!studentCourses?.length ||
      (!!studentCourses?.length &&
        !studentCourses.find((c) => c.courseId === courseId)));

  const isPreviewMode = isPublicUsers || isUnauthorizedStudent;

  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetStudentCoursesLoading ||
    isGetStudentCoursesFetching ||
    isGetCourseLoading ||
    isGetCourseFetching;

  const [selectedLesson, setSelectedLesson] = useState<ICourseLesson | null>(
    null
  );

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

  useEffect(() => {
    if (!!courseDetails) {
      setSelectedLesson({
        ...courseDetails.sections[0].lessons[0],
        order: `${courseDetails.sections[0].order}.${courseDetails.sections[0].lessons[0].order}`,
      });
    }
  }, [courseDetails]);

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

  if (!courseId || !courseDetails)
    return (
      <Box p="1rem">
        <Text>Không tìm thấy khoá học này</Text>
      </Box>
    );

  if (isLoading)
    return (
      <Box p="1rem">
        <Spinner color="orange.300" />
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
              course={courseDetails}
              selectedLesson={selectedLesson}
              disabledLessons={disabledLessons}
            />
          </Box>
          <Box flex="1">
            <CourseSections
              disabledLessons={disabledLessons}
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
