import { useRouter } from "next/router";
import {
  useGetCourseDetailsQuery,
  useGetCourseQuery,
  useGetStudentCoursesQuery,
} from "@/store/apis/db";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import PageContainer from "@/components/Layout/PageContainer";
import "@fontsource/roboto-slab";

import {
  Flex,
  Text,
  Spinner,
  Divider,
  Box,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { ICourse, ICourseDetails } from "@/types/course";
import { FC } from "react";
import PageBreadcrumb from "@/components/UI/PageBreadcrumb";
import { IBreadcrumbLink } from "@/components/UI/PageBreadcrumb/types";
import { ROUTE } from "@/constants/route";
import Head from "next/head";
import { BsPerson, BsStar } from "react-icons/bs";
import CourseSections from "@/views/CourseView/CourseSections";
import PlayableThumbnail from "@/components/Course/PlayableThumbnail";
import { displayPrice } from "@/utils/display";
import {
  useCurrentUserSelector,
  useUserRoleSelector,
} from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { BsCartPlus, BsHeart, BsEye } from "react-icons/bs";
import { MdCheck, MdCheckCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart";
import { useCartCoursesSelector } from "@/store/slices/cart";
import CoursePreviewModal from "@/components/Course/CoursePreviewModal";

const CourseDetails = () => {
  const router = useRouter();
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const { query } = router;
  const courseId = query?.courseId as string;

  const {
    data: course,
    isLoading: isGetCourseLoading,
    isFetching: isGetCourseFetching,
  } = useGetCourseQuery(!!courseId ? { id: courseId } : skipToken);
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
    data: studentCourses = [],
    isLoading: isGetStudentCoursesLoading,
    isFetching: isGetStudentCoursesFetching,
  } = useGetStudentCoursesQuery(
    !!currentUser && userRole === UserRole.student
      ? {
          userId: currentUser?.uid ?? "",
        }
      : skipToken
  );

  const isPurchased = !!studentCourses.find((c) => c.courseId === courseId);

  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetCourseLoading ||
    isGetCourseFetching ||
    isGetStudentCoursesLoading ||
    isGetStudentCoursesFetching;

  return (
    <>
      <Head>
        <title>{courseDetails?.name ?? "Chi tiết khoá học"}</title>
      </Head>
      <PageContainer>
        {isLoading ? (
          <Spinner color={COLORS.twilightBlue} />
        ) : (
          <Flex>
            {!!courseDetails && !!course ? (
              <Main
                courseDetails={courseDetails}
                course={course}
                isPurchased={isPurchased}
              />
            ) : (
              <NotFoundState />
            )}
          </Flex>
        )}
      </PageContainer>
    </>
  );
};

type MainProps = {
  courseDetails: ICourseDetails;
  course: ICourse;
  isPurchased?: boolean;
};
const Main: FC<MainProps> = ({ courseDetails, course, isPurchased }) => {
  const {
    isOpen: isPreviewModalOpen,
    onClose: onClosePreviewModal,
    onOpen: onOpenPreviewModal,
  } = useDisclosure();

  const {
    name,
    description,
    teacherName,
    rating,
    ratingCount,
    overview,
    sections,
    thumbnailUrl,
  } = courseDetails;
  const { price, previousPrice } = course;

  return (
    <>
      <CoursePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={onClosePreviewModal}
        courseDetails={courseDetails}
      />
      <Flex flexDir="column" w="100%">
        <Breadcrumb />
        <Flex gap="3rem" alignItems="flex-start" w="100%">
          {/* Overview */}
          <Flex flex="6.5" flexDir="column" gap="1.5rem">
            <Flex flexDir="column" gap="1rem">
              <Flex flexDir="column" gap="0.5rem">
                <Text fontSize="1.5rem" fontFamily="Roboto Slab">
                  {name}
                </Text>
                <Text>{description}</Text>
              </Flex>
              <Flex flexDir="column" gap="0.5rem">
                <CourseTeacher teacherName={teacherName} />
                <CourseRating rating={rating} ratingCount={ratingCount} />
              </Flex>
            </Flex>
            <Divider />
            <CourseOverview overview={overview} />
            <CourseContent courseDetails={courseDetails} />
          </Flex>
          {/* Preview */}
          <Flex flex="3.5" boxShadow="md" minH="10rem" flexDir="column">
            <Box p="0.5rem">
              <PlayableThumbnail
                thumbnailUrl={thumbnailUrl}
                onPlay={onOpenPreviewModal}
              />
            </Box>
            <Flex flexDir="column" p="1rem 1.5rem" gap="1rem">
              <CoursePrice previousPrice={previousPrice} price={price} />
              {isPurchased ? (
                <PrivateActions />
              ) : (
                <PublicActions course={course} />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

type CourseTeacherProps = { teacherName: string };
const CourseTeacher: FC<CourseTeacherProps> = ({ teacherName }) => {
  return (
    <Flex alignItems="center" gap="0.5rem" color={COLORS.twilightBlue}>
      <BsPerson />
      <Text fontSize="0.75rem">
        {!!teacherName ? teacherName : "[Tên giáo viên]"}
      </Text>
    </Flex>
  );
};

type CourseRatingProps = {
  rating?: number;
  ratingCount?: number;
};
const CourseRating: FC<CourseRatingProps> = ({ rating, ratingCount }) => {
  return (
    <Flex alignItems="center" gap="0.5rem" color={COLORS.twilightBlue}>
      <BsStar />
      <Text fontSize="0.75rem">
        <Text as="span">
          Đánh giá: {!!rating ? `${rating}/5` : "Cập nhật..."}
        </Text>{" "}
        {!!ratingCount && (
          <Text as="span">({ratingCount?.toLocaleString()})</Text>
        )}
      </Text>
    </Flex>
  );
};

type CourseOverviewProps = {
  overview?: string;
};
const CourseOverview: FC<CourseOverviewProps> = ({ overview }) => {
  return (
    <Flex flexDir="column" gap="0.5rem">
      <Text fontSize="1.25rem" fontWeight="700">
        Khái quát khoá học
      </Text>
      <Text>{overview ?? "Cập nhật..."}</Text>
    </Flex>
  );
};

type CourseContentProps = {
  courseDetails?: ICourseDetails;
};
const CourseContent: FC<CourseContentProps> = ({ courseDetails }) => {
  return (
    <Flex flexDir="column" gap="0.5rem">
      <Text fontSize="1.25rem" fontWeight="700">
        Nội dung khoá học
      </Text>
      {!!courseDetails ? (
        <CourseSections course={courseDetails} />
      ) : (
        <Text>Cập nhật...</Text>
      )}
    </Flex>
  );
};

type CoursePriceProps = {
  price: number;
  previousPrice?: number | null;
};
const CoursePrice: FC<CoursePriceProps> = ({ price, previousPrice }) => {
  return (
    <Flex alignItems="center" gap="1rem">
      <Text fontWeight="600" fontSize="2rem">
        {displayPrice(price)}
      </Text>
      {!!previousPrice && (
        <Text
          fontSize="1rem"
          textDecoration="line-through"
          color={COLORS.summerBlue}
        >
          {displayPrice(previousPrice)}
        </Text>
      )}
    </Flex>
  );
};

type PublicActionsProps = {
  course: ICourse;
};
const PublicActions: FC<PublicActionsProps> = ({ course }) => {
  const dispatch = useDispatch();
  const userRole = useUserRoleSelector();
  const cartCourses = useCartCoursesSelector();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(cartActions.addCourse(course));
  };

  const handleGoToCart = () => {
    router.push(ROUTE.cart);
  };

  const isAddedToCard = !!cartCourses.find((c) => c.id === course.id);

  return (
    <Flex flexDir="column" gap="0.5rem">
      {isAddedToCard && (
        <Flex
          color="orange.400"
          w="fit-content"
          gap="0.5rem"
          alignItems="center"
        >
          <MdCheck size="1.25rem" />
          <Text fontSize="0.75rem" fontWeight="500">
            Đã được thêm vào giỏ
          </Text>
        </Flex>
      )}
      <Flex alignItems="center" gap="1rem">
        {isAddedToCard ? (
          <Button
            leftIcon={<BsEye size="1.25rem" />}
            flex="1"
            variant="outline"
            onClick={handleGoToCart}
            isDisabled={userRole === UserRole.teacher}
          >
            Xem giỏ hàng
          </Button>
        ) : (
          <Button
            leftIcon={<BsCartPlus size="1.25rem" />}
            flex="1"
            onClick={handleAddToCart}
            isDisabled={userRole === UserRole.teacher}
          >
            Bỏ vào giỏ
          </Button>
        )}
        <IconButton
          aria-label="wishlist"
          icon={<BsHeart size="1.25rem" />}
          isDisabled={userRole === UserRole.teacher}
        />
      </Flex>
    </Flex>
  );
};

type PrivateActionsProps = {};
const PrivateActions: FC<PrivateActionsProps> = () => {
  return (
    <Flex
      alignItems="center"
      gap="0.5rem"
      bgColor={COLORS.whiteSatin}
      p="0.25rem 0.5rem"
      borderRadius="lg"
    >
      <MdCheckCircle size="1.25rem" />
      <Text>Bạn đã sở hữu khoá học này</Text>
    </Flex>
  );
};

const NotFoundState = () => {
  return <Text textAlign="center">Không tìm thấy khoá học!</Text>;
};

type BreadcrumbProps = {};
const Breadcrumb: FC<BreadcrumbProps> = () => {
  const links: IBreadcrumbLink[] = [
    { path: ROUTE.home, name: "Trang Chủ" },
    { path: ROUTE.store, name: "Cửa hàng" },
  ];

  return <PageBreadcrumb links={links} />;
};

export default CourseDetails;
