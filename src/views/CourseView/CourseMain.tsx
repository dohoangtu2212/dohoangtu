import { Flex, Box, useBoolean, FlexProps } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("@/components/DynTube/Video"), {
  ssr: false,
});
import { ICourseDetails, ICourseLesson, IDisabledLesson } from "@/types/course";
import { FC, useCallback, useEffect, useState } from "react";
import {
  useGetStudentViewsCountQuery,
  useUpdateStudentViewsCountMutation,
} from "@/store/apis/db";
import {
  useCurrentUserSelector,
  useUserRoleSelector,
} from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import useCustomToast from "@/hooks/useCustomToast";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";

type CourseMainProps = {
  courseDetails: ICourseDetails;
  disabledLessons: IDisabledLesson[];
  selectedLesson: ICourseLesson | null;
  onVideoEnded: () => void;
  onNext?: () => void;
  onPrev?: () => void;
};
const CourseMain: FC<CourseMainProps> = ({
  courseDetails,
  selectedLesson,
  disabledLessons = [],
  onVideoEnded,
  onNext,
  onPrev,
}) => {
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const toast = useCustomToast();
  const [updateStudentViewsCount] = useUpdateStudentViewsCountMutation();
  const [hasPaused, setHasPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const isStudent = userRole === UserRole.student;

  const {
    data: viewsCount,
    isLoading: isGetStudentViewsCountLoading,
    isFetching: isGetStudentViewsCountFetching,
  } = useGetStudentViewsCountQuery(
    {
      studentId: currentUser?.uid as string,
    },
    {
      skip: !currentUser?.uid || !isStudent,
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
  const isLimitViewsReached = viewsCountOfCurrentVideo >= 20;

  const handlePauseVideo = () => {
    setHasPaused(true);
  };

  const handleEndVideo = () => {
    onVideoEnded?.();
  };

  const handlePlayVideo = () => {
    setHasStarted(true);
  };

  const showToastAndSubmitViewsCount = useCallback(async () => {
    if (hasPaused || !currentUser?.uid || !videoKey || !isStudent) return;
    const newViewsCount = viewsCountOfCurrentVideo + 1;
    try {
      await updateStudentViewsCount({
        studentId: currentUser.uid,
        dyntubeVideoKey: videoKey,
        count: newViewsCount,
      });
      toast(`Lượt xem: ${newViewsCount}/20`, "info");
    } catch (err) {
      toast(`Có lỗi xảy ra!`, "error");
    }
  }, [
    viewsCountOfCurrentVideo,
    toast,
    hasPaused,
    videoKey,
    currentUser,
    updateStudentViewsCount,
    isStudent,
  ]);

  const handleClickDisablingBox = useCallback(() => {
    toast(
      `Quá lượt xem cho phép! Lượt xem: ${viewsCountOfCurrentVideo}/20`,
      "error"
    );
  }, [viewsCountOfCurrentVideo, toast]);

  useEffect(() => {
    if (hasStarted) {
      showToastAndSubmitViewsCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  useEffect(() => {
    setHasPaused(false);
    setHasStarted(false);
  }, [selectedLesson]);

  if (!courseDetails || !videoKey) return null;

  const commonNavigatingFlexProps: FlexProps = {
    w: "2.5rem",
    h: "2.5rem",
    position: "absolute",
    border: "1px solid white",
    zIndex: "9999",
    top: "calc(50% - 1.25rem)",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    bgColor: "blackAlpha.500",
  };

  return (
    <Flex flexDir="column" w="100%" bgColor="red">
      <Box position="relative">
        <Flex {...commonNavigatingFlexProps} left="0" onClick={onPrev}>
          <IoMdSkipBackward size="1.5rem" />
        </Flex>
        <Flex {...commonNavigatingFlexProps} right="0" onClick={onNext}>
          <IoMdSkipForward size="1.5rem" />
        </Flex>
        {isLimitViewsReached && (
          <Box
            w="100%"
            h="100%"
            bgColor="blackAlpha.400"
            zIndex="9999"
            position="absolute"
            cursor="not-allowed"
            onClick={handleClickDisablingBox}
          />
        )}
        <Video
          dynTubeKey={videoKey}
          w="100%"
          minH={{ base: "fit-content", md: "30rem" }}
          onEnded={handleEndVideo}
          onPause={handlePauseVideo}
          onPlay={handlePlayVideo}
        />
      </Box>
    </Flex>
  );
};

export default CourseMain;
