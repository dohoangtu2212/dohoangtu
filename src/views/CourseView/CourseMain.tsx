import {
  Flex,
  Box,
  useBoolean,
  FlexProps,
  Text,
  ColorModeContext,
  Button,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("@/components/DynTube/Video"), {
  ssr: false,
});
import {
  ICourseDetails,
  ICourseLesson,
  ICourseLessonPractice,
  ICourseLessonType,
  IDisabledLesson,
} from "@/types/course";
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
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { COLORS } from "@/constants/theme/colors";

interface CourseMainProps {
  courseDetails: ICourseDetails;
  disabledLessons: IDisabledLesson[];
  selectedLesson: ICourseLesson | null;
  onVideoEnded: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}
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

  if (!courseDetails) return null;

  if (selectedLesson?.type === ICourseLessonType.assignment) {
    if (!selectedLesson.practices?.length) {
      return <Text>Câu hỏi chưa được tạo.</Text>;
    }

    const practices: ICourseLessonPractice[] = selectedLesson.practices ?? [];
    return <LessonPractices practices={practices} />;
  }

  if (selectedLesson?.type === ICourseLessonType.video && !videoKey)
    return null;

  const commonNavigatingFlexProps: FlexProps = {
    w: "1.5rem",
    h: "2.5rem",
    position: "absolute",
    border: "1px solid white",
    zIndex: "20",
    top: "calc(50% - 1.25rem)",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    bgColor: "blackAlpha.500",
  };

  return (
    <Flex flexDir="column" w="100%">
      <Box position="relative">
        <Flex
          {...commonNavigatingFlexProps}
          left="0"
          onClick={onPrev}
          pl="0.25rem"
        >
          <MdArrowBackIos size="1rem" />
        </Flex>
        <Flex {...commonNavigatingFlexProps} right="0" onClick={onNext}>
          <MdArrowForwardIos size="1rem" />
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

interface LessonPracticesProps {
  practices: ICourseLessonPractice[];
}
const LessonPractices: FC<LessonPracticesProps> = ({ practices }) => {
  const [userAnswers, setUserAnswers] = useState(practices.map(() => ""));
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      px="1rem"
      minH="20rem"
      maxH="80vh"
      overflow="auto"
      gap="1rem"
    >
      <Text fontWeight="700" fontSize="1.25rem">
        BÀI TẬP
      </Text>
      <Flex flexDir="column" gap="1rem" w={{ base: "100%", lg: "40rem" }}>
        {practices.map(({ question, answers, correctAnswer }, practiceIdx) => {
          return (
            <Flex key={practiceIdx} flexDir="column" gap="0.5rem">
              <Text fontWeight="600">{`Q${practiceIdx + 1}: ${question}`}</Text>
              <Flex flexDir="column" gap="0.25rem">
                {answers.map((answer, answerIdx) => {
                  const isSelected = answer === userAnswers[practiceIdx];
                  const isCorrect = answer === correctAnswer;

                  let borderColor = COLORS.summerBlue;
                  let bgColor = "transparent";
                  if (isSelected) {
                    if (isCorrect && showAnswers) {
                      borderColor = "green.500";
                      bgColor = "green.300";
                    } else if (!isCorrect && showAnswers) {
                      borderColor = "red.500";
                      bgColor = "red.300";
                    } else {
                      borderColor = COLORS.starryNightBlue;
                      bgColor = COLORS.summerBlue;
                    }
                  } else {
                    if (isCorrect && showAnswers) {
                      borderColor = "green.500";
                      bgColor = "green.300";
                    }
                  }

                  return (
                    <Flex
                      key={`${practiceIdx}_${answerIdx}`}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor={borderColor}
                      bgColor={bgColor}
                      p="0.125rem 0.5rem"
                      borderRadius="md"
                      userSelect="none"
                      cursor="pointer"
                      onClick={() =>
                        setUserAnswers((pre) => {
                          const draft = [...pre];
                          draft[practiceIdx] = answer;

                          return draft;
                        })
                      }
                    >
                      <Text>{answer}</Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Button onClick={() => setShowAnswers((prev) => !prev)}>
        {`${showAnswers ? "Ẩn" : "Kiểm tra"} kết quả`}
      </Button>
    </Flex>
  );
};

export default CourseMain;
