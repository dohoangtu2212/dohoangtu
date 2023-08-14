import {
  Box,
  Button,
  Divider,
  DrawerProps,
  Flex,
  IconButton,
  IconButtonProps,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import CourseSections from "@/views/CourseView/CourseSections";
import CourseMain from "@/views/CourseView/CourseMain";
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  FC,
  forwardRef,
} from "react";
import { ICourseLesson } from "@/types/course";
import { useRouter } from "next/router";
import {
  useGetCourseDetailsQuery,
  useGetStudentViewsCountQuery,
  useUpdateStudentCourseProgressMutation,
} from "@/store/apis/db";
import { MdArrowBack, MdArrowBackIos, MdArrowForward } from "react-icons/md";
import { useCurrentUserSelector } from "@/store/slices/user";
import { useGetStudentCoursesQuery } from "@/store/apis/db";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { filter, flatten, flattenDeep, map, slice } from "lodash";
import type { ICourseChapter, IDisabledLesson } from "@/types/course";
import { useGetCourseQuery } from "@/store/apis/db";
import AddToCartModal from "@/views/CourseView/AddToCartModal";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart";
import { ROUTE } from "@/constants/route";
import { COLORS } from "@/constants/theme/colors";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import useMobile from "@/hooks/useMobile";
import CourseInfo from "@/views/CourseView/CourseInfo";

const CourseView = () => {
  const { isMobile } = useMobile();
  const [currentChapter, setCurrentChapter] = useState<ICourseChapter | null>(
    null
  );
  const [selectedLesson, setSelectedLesson] = useState<ICourseLesson | null>(
    null
  );

  const dispatch = useDispatch();
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const router = useRouter();
  const { query } = router;

  const {
    isOpen: isAddToCartModalOpen,
    onOpen: openAddToCartModal,
    onClose: closeAddToCartModal,
  } = useDisclosure();

  const courseId = query?.courseId as string;

  const [updateStudentCourseProgress] =
    useUpdateStudentCourseProgressMutation();

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
    if (!currentChapter) return [];
    const { sections } = currentChapter;
    const parsedLessons = filter(
      flattenDeep(map(sections, (sec) => sec.lessons)),
      (le) => !!le
    );
    return map(parsedLessons, (le) => le.dyntubeKey);
  }, [currentChapter]);

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
    currentChapter: ICourseChapter
  ) => {
    const { order } = selectedLesson;
    const [sectionOrder, lessonOrder] = order.toString().split(".");

    const { sections } = currentChapter;
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
    if (!selectedLesson || !currentChapter) return;
    moveToNextLesson(selectedLesson, currentChapter);
    updateCourseProgress();
    // Move to next lesson
  }, [selectedLesson, currentChapter, updateCourseProgress]);

  const handleChapterChange = (chapter: ICourseChapter) => {
    const { sections } = chapter;
    setCurrentChapter(chapter);
    if (!sections[0]) return;
    const { lessons } = sections[0];
    setSelectedLesson(lessons[0]);
  };

  // set default lesson
  useEffect(() => {
    if (!courseDetails) return;

    if (!!courseDetails.chapters[0]) {
      setCurrentChapter(courseDetails.chapters[0]);
    }

    if (!!courseDetails.chapters[0].sections[0].lessons?.[0]) {
      const section = courseDetails.chapters[0].sections[0];
      const lesson = section.lessons[0];
      setSelectedLesson({
        ...lesson,
        order: `${section.order}.${lesson.order}`,
      });
    }
  }, [courseDetails]);

  const isPreviewMode = isPublicUsers || isUnauthorizedStudent;

  // For public view, only able to access the first 3 video
  const disabledLessons: IDisabledLesson[] = useMemo(() => {
    if (!currentChapter) return [];
    if (!isPreviewMode) return [];
    const { sections } = currentChapter;
    const sectionOrderAndLessons = sections.map((s) =>
      flatten(s.lessons).map((l) => ({
        lessonOrder: l.order,
        sectionOrder: s.order,
      }))
    );
    return slice(flatten(sectionOrderAndLessons), 3);
  }, [isPreviewMode, currentChapter]);

  const courseChapters = useMemo(() => {
    if (!courseDetails || !courseDetails.chapters) return [];

    return courseDetails.chapters;
  }, [courseDetails]);

  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetStudentCoursesLoading ||
    isGetStudentCoursesFetching ||
    isGetCourseLoading ||
    isGetCourseFetching ||
    isGetStudentViewsCountLoading ||
    isGetCourseDetailsFetching;

  const showChapterManager = !!courseChapters && !!currentChapter;

  // return statements
  if (!courseDetails) return null;

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

  return (
    <>
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={closeAddToCartModal}
        onAddToCart={handleAddToCart}
      />
      <Flex
        minH="100vh"
        flexDir="column"
        pt={{ base: "0.5rem", lg: "1rem" }}
        gap="0.5rem"
      >
        <Flex
          px={{ base: "0.5rem", lg: "2rem" }}
          alignItems="center"
          gap={{ base: "0.5rem", lg: "1rem" }}
        >
          <IconNavigateButton
            aria-label="back"
            icon={<MdArrowBack size="1.5rem" />}
            onClick={() => router.back()}
          />
          <Text
            fontWeight="600"
            fontSize="0.875rem"
            textTransform="uppercase"
            letterSpacing="0.05rem"
          >
            {courseDetails.name}
          </Text>
        </Flex>
        <Divider />

        {showChapterManager && (
          <ChapterManagement
            currentChapter={currentChapter}
            chapters={courseChapters}
            onCurrentChapterChange={handleChapterChange}
          />
        )}

        <Flex flexDir={{ base: "column", lg: "row" }}>
          <Box flex="3">
            <CourseMain
              onVideoEnded={handleCurrentVideoEnded}
              courseDetails={courseDetails}
              selectedLesson={selectedLesson}
              disabledLessons={disabledLessons}
            />
            {!isMobile && <CourseInfo courseDetails={courseDetails} />}
          </Box>
          <Box flex="1">
            <CourseSections
              disabledLessons={disabledLessons}
              selectedLesson={selectedLesson}
              sections={currentChapter?.sections ?? []}
              onLessonSelected={setSelectedLesson}
              onDisabledLessonSelected={handleSelectDisabledLesson}
            />
          </Box>
        </Flex>
        {isMobile && <CourseInfo courseDetails={courseDetails} />}
      </Flex>
    </>
  );
};

type ChapterManagementProps = {
  currentChapter: ICourseChapter;
  chapters: ICourseChapter[];
  onCurrentChapterChange?: (chapter: ICourseChapter) => void;
};
const ChapterManagement: FC<ChapterManagementProps> = ({
  currentChapter,
  chapters,
  onCurrentChapterChange,
}) => {
  const { isMobile } = useMobile();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const currentChapterIdx = chapters.findIndex(
    (ch) => ch.order === currentChapter.order
  );

  const handlePrev = () => {
    if (currentChapterIdx > 0) {
      onCurrentChapterChange?.(chapters[currentChapterIdx - 1]);
    }
  };
  const handleNext = () => {
    if (currentChapterIdx < chapters.length - 1) {
      onCurrentChapterChange?.(chapters[currentChapterIdx + 1]);
    }
  };

  return (
    <>
      <ChaptersDrawer isOpen={isOpen} onClose={onClose} />
      <Flex flexDir="column" gap="0.5rem">
        <Flex
          p={{ base: "0 0.5rem", lg: "0.5rem 1rem" }}
          alignItems="center"
          gap="1rem"
          pr={{ base: "auto", lg: "2rem" }}
          w="100%"
          justifyContent="space-between"
        >
          <Button variant="link" px="0" onClick={onOpen} fontSize="0.875rem">
            Danh sách chương
          </Button>
          {!isMobile && <ChapterTitle chapter={currentChapter} />}
          <Flex alignItems="center" gap="1rem">
            <Tooltip label="Chương trước" isDisabled={isMobile}>
              <IconNavigateButton
                isDisabled={currentChapterIdx === 0}
                aria-label="next"
                icon={<MdArrowBack size="1.5rem" />}
                onClick={handlePrev}
              />
            </Tooltip>
            <Tooltip label="Chương sau" isDisabled={isMobile}>
              <IconNavigateButton
                isDisabled={currentChapterIdx === chapters.length - 1}
                aria-label="next"
                icon={<MdArrowForward size="1.5rem" />}
                onClick={handleNext}
              />
            </Tooltip>
          </Flex>
        </Flex>
        {isMobile && <ChapterTitle chapter={currentChapter} />}
      </Flex>
    </>
  );
};

type ChapterTitleProps = { chapter: ICourseChapter };
const ChapterTitle: FC<ChapterTitleProps> = ({ chapter }) => {
  return (
    <Text
      textAlign="center"
      fontSize={{ base: "1rem", lg: "1.25rem" }}
      fontWeight="600"
      flex="1"
    >
      Chương {chapter.order} : ${chapter.name}
    </Text>
  );
};

type ChaptersDrawerProps = Omit<DrawerProps, "children"> & {};
const ChaptersDrawer: FC<ChaptersDrawerProps> = ({ ...drawersProps }) => {
  return (
    <Drawer placement="left" {...drawersProps}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Danh sách chương</DrawerHeader>
        <DrawerBody></DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

type IconNavigateButtonProps = IconButtonProps & {};
const IconNavigateButton: FC<IconNavigateButtonProps> = forwardRef(
  ({ ...buttonProps }, ref) => {
    return (
      <IconButton
        ref={ref}
        w="fit-content"
        h="fit-content"
        p="0"
        minW="none"
        minH="none"
        variant="unstyle"
        {...buttonProps}
      />
    );
  }
);
IconNavigateButton.displayName = "IconNavigateButton";

export default CourseView;
