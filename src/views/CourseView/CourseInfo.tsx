import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Input,
  Button,
  Spinner,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import CourseOverview from "@/components/Course/CourseOverview";
import { FC, ReactNode, useCallback, useState } from "react";
import { ICourseComment, ICourseDetails } from "@/types/course";
import useMobile from "@/hooks/useMobile";
import {
  useCurrentUserSelector,
  useUserRoleSelector,
} from "@/store/slices/user";
import { MdOutlineDelete, MdSend } from "react-icons/md";
import useCustomToast from "@/hooks/useCustomToast";
import {
  useAddCourseDetailsCommentMutation,
  useDeleteCourseDetailsCommentMutation,
  useGetCourseDetailsCommentsQuery,
} from "@/store/apis/db";
import dayjs from "dayjs";
import { COLORS } from "@/constants/theme/colors";
import { orderBy, sortBy } from "lodash";
import { UserRole } from "@/types/permission";

type CourseInfoProps = {
  courseDetails?: ICourseDetails;
  courseSectionsNode?: ReactNode;
};
const CourseInfo: FC<CourseInfoProps> = ({
  courseDetails,
  courseSectionsNode,
}) => {
  const { isMobile } = useMobile();

  return (
    <Tabs w="100%" px={{ base: "0.5rem", lg: "1rem" }}>
      <TabList>
        {isMobile && (
          <Tab fontSize={{ base: "0.875rem", lg: "1rem" }} px="0.75rem">
            Bài giảng
          </Tab>
        )}
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }} px="0.75rem">
          Tổng quan
        </Tab>
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }} px="0.75rem">
          Bình luận
        </Tab>
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }} px="0.75rem">
          Thông báo
        </Tab>
      </TabList>
      <TabPanels>
        {isMobile && <TabPanel>{courseSectionsNode}</TabPanel>}
        <TabPanel px="0">
          <CourseOverview overview={courseDetails?.overview} />
        </TabPanel>

        <TabPanel px="0">
          {!!courseDetails && <Comments courseDetailsId={courseDetails.id} />}
        </TabPanel>

        <TabPanel px="0">
          <Text>Cập nhật...</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

interface CommentsProps {
  courseDetailsId: string;
}
const Comments: FC<CommentsProps> = ({ courseDetailsId }) => {
  const userRole = useUserRoleSelector();
  const {
    data,
    isLoading: isGetCommentsLoading,
    isFetching: isGetCommentsFetching,
  } = useGetCourseDetailsCommentsQuery({
    courseDetailsId,
  });

  const isLoading = isGetCommentsLoading || isGetCommentsFetching;
  const comments = data?.comments ?? [];
  const isStudent = userRole === UserRole.student;

  const [comment, setComment] = useState<string>("");
  const currentUser = useCurrentUserSelector();
  const toast = useCustomToast();
  const [addComment, { isLoading: isAddCommentLoading, error }] =
    useAddCourseDetailsCommentMutation();
  const [deleteComment, { isLoading: isDeleteCommentLoading }] =
    useDeleteCourseDetailsCommentMutation();

  const handleSendComment = useCallback(async () => {
    if (!currentUser) {
      toast("Bạn cần phải đăng nhập để bình luận", "warning");
      return;
    }
    const { email, displayName, uid } = currentUser;
    const newComment: ICourseComment = {
      userId: uid,
      userEmail: email as string,
      userName: displayName,
      comment,
      createdAt: dayjs().toString(),
    };

    await addComment({
      courseDetailsId,
      data: newComment,
    }).unwrap();
    setComment("");
    toast("Bình luận của bạn đã được gửi", "success");
  }, [comment, currentUser, toast, courseDetailsId, addComment]);

  return (
    <Flex flexDir="column" p="0.5rem" gap="1.5rem" position="relative">
      {(isLoading || isDeleteCommentLoading) && <Spinner position="absolute" />}
      <Flex
        flexDir="column"
        gap="0.75rem"
        minH="5rem"
        maxH="20rem"
        overflow="auto"
      >
        {!!comments.length ? (
          <>
            {orderBy(comments, (comment) => comment?.createdAt, "desc").map(
              (com, idx) => {
                if (!com) return null;
                const { userName, userEmail, userId, comment, createdAt } = com;

                const userCred = userName ?? userEmail?.split("@")[0];

                return (
                  <Flex
                    alignItems="flex-start"
                    key={`${userId}_${createdAt}`}
                    w="100%"
                    bgColor={!!(idx % 2) ? "gray.200" : ""}
                    p="0.5rem"
                    borderRadius="md"
                    gap="1rem"
                  >
                    <Avatar name={userCred} size="sm" fontWeight="700" />
                    <Flex flexDir="column" flex="1">
                      <Text fontWeight="600">{comment}</Text>
                      <Flex alignItems="center" gap="0.5rem">
                        <Text fontSize="0.75rem">{userName ?? userEmail}</Text>
                        <Text fontSize="0.675rem">
                          {dayjs(createdAt).format("DD/MM/YY, HH:mm")}
                        </Text>
                      </Flex>
                    </Flex>
                    {!isStudent && (
                      <IconButton
                        p="0"
                        aria-label="delete"
                        icon={<MdOutlineDelete size="1.5rem" />}
                        variant="text"
                        onClick={async () =>
                          await deleteComment({
                            courseDetailsId,
                            commentIdx: idx,
                          })
                        }
                      />
                    )}
                  </Flex>
                );
              }
            )}
          </>
        ) : (
          <Text textAlign="center">Chưa có bình luận</Text>
        )}
      </Flex>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSendComment();
        }}
      >
        <Flex alignItems="center" gap="1rem">
          <Input
            placeholder="Nhập bình luận của bạn"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
          <Button
            type="submit"
            rightIcon={<MdSend />}
            isLoading={isAddCommentLoading}
            isDisabled={!comment}
          >
            Gửi
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default CourseInfo;
