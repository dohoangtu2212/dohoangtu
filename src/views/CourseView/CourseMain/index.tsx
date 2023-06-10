import {
  Flex,
  IconButton,
  Button,
  Text,
  Box,
  ButtonProps,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("@/components/DynTube/Video"), {
  ssr: false,
});
import { MdSearch } from "react-icons/md";
import { ICourseDetails, ICourseLesson, IDisabledLesson } from "@/types/course";
import { FC } from "react";
import { COLORS } from "@/constants/theme";
import {
  useGetStudentViewsCountQuery,
  useUpdateStudentViewsCountMutation,
} from "@/store/apis/db";
import {
  useCurrentUserSelector,
  useUserRoleSelector,
} from "@/store/slices/user";
import { UserRole } from "@/types/permission";

type CourseMainProps = {
  course: ICourseDetails;
  disabledLessons: IDisabledLesson[];
  selectedLesson: ICourseLesson | null;
};
const CourseMain: FC<CourseMainProps> = ({
  course,
  selectedLesson,
  disabledLessons = [],
}) => {
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const [updateStudentViewsCount] = useUpdateStudentViewsCountMutation();

  const {
    data: viewsCount,
    isLoading: isGetStudentViewsCountLoading,
    isFetching: isGetStudentViewsCountFetching,
  } = useGetStudentViewsCountQuery(
    {
      studentId: currentUser?.uid as string,
    },
    {
      skip: !currentUser?.uid || userRole !== UserRole.student,
    }
  );

  const isDisabled = disabledLessons.find(
    (dL) => `${dL.sectionOrder}.${dL.lessonOrder}` === selectedLesson?.order
  );
  const videoKey =
    !!selectedLesson?.dyntubeKey && !isDisabled
      ? selectedLesson.dyntubeKey
      : "";

  const viewsCountOfCurrentVideo = viewsCount?.[videoKey] ?? 0;

  if (!course || !videoKey) return null;

  const handlePauseVideo = () => {};

  const handleEndVideo = () => {};

  const handlePlayVideo = () => {};

  return (
    <Flex flexDir="column" w="100%">
      {!!selectedLesson && (
        <Text px="1rem" py="0.5rem">
          Bài {selectedLesson.order}: {selectedLesson?.name}
        </Text>
      )}
      <Video
        dynTubeKey={videoKey}
        w="100%"
        minH={{ base: "fit-content", md: "30rem" }}
        onEnded={handleEndVideo}
        onPause={handlePauseVideo}
        onPlay={handlePlayVideo}
      />
      <Flex
        alignItems="center"
        bg={COLORS.white}
        py="0.25rem"
        flexWrap="wrap"
        px={{ base: "0", md: "1rem" }}
        gap="0.5rem"
      >
        <IconButton
          variant="ghost"
          aria-label="search"
          icon={<MdSearch size="1.25rem" />}
        />
        <ActionButton>Tổng quan</ActionButton>
        <ActionButton variant="ghost">Hỏi đáp</ActionButton>
        <ActionButton variant="ghost">Lưu ý</ActionButton>
        <ActionButton variant="ghost">Thông báo</ActionButton>
        <ActionButton variant="ghost">Đánh giá</ActionButton>
      </Flex>
    </Flex>
  );
};

type ActionButtonProps = ButtonProps & {};
const ActionButton: FC<ActionButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <Button
      variant="ghost"
      fontSize={{ base: "0.75rem", md: "1rem" }}
      px={{ base: "0.125rem", md: "1rem" }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default CourseMain;
