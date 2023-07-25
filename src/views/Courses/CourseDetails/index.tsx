import { useRouter } from "next/router";
import { useGetCourseDetailsQuery, useGetCourseQuery } from "@/store/apis/db";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import PageContainer from "@/components/Layout/PageContainer";

import { Flex, Text, Spinner } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme";
import { ICourseDetails } from "@/types/course";
import { FC } from "react";
import PageBreadcrumb from "@/components/UI/PageBreadcrumb";
import { IBreadcrumbLink } from "@/components/UI/PageBreadcrumb/types";
import { ROUTE } from "@/constants/route";
import Head from "next/head";

const CourseDetails = () => {
  const router = useRouter();
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

  const isLoading =
    isGetCourseDetailsFetching ||
    isGetCourseDetailsLoading ||
    isGetCourseLoading ||
    isGetCourseFetching;

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
            {!!courseDetails ? (
              <Main courseDetails={courseDetails} />
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
};
const Main: FC<MainProps> = ({ courseDetails }) => {
  const { name } = courseDetails;

  return (
    <Flex flexDir="column">
      <Breadcrumb />
      <Text fontSize="1.5rem" fontFamily="Roboto Slab">
        {name}
      </Text>
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
