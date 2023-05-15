import { Flex, IconButton, Button, Text, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Video = dynamic(() => import("@/components/DynTube/Video"), {
  ssr: false,
});
import { MdSearch } from "react-icons/md";
import { ICourseDetails, ICourseLesson } from "@/types/course";
import { FC } from "react";

type CourseMainProps = {
  course: ICourseDetails;
  selectedLesson: ICourseLesson | null;
};
const CourseMain: FC<CourseMainProps> = ({ course, selectedLesson }) => {
  const videoKey = selectedLesson?.dyntubeKey ?? "";

  if (!course || !videoKey) return null;

  return (
    <Flex flexDir="column" w="100%">
      {!!selectedLesson && (
        <Text px="1rem" py="0.5rem">
          Bài {selectedLesson.order}: {selectedLesson?.name}
        </Text>
      )}
      <Video dynTubeKey={videoKey} w="100%" minH="30rem" />
      <Flex alignItems="center" bg="white" py="0.25rem" px="1rem">
        <IconButton variant="ghost" aria-label="search" icon={<MdSearch />} />
        <Button variant="ghost">Tổng quan</Button>
        <Button variant="ghost">Hỏi đáp</Button>
        <Button variant="ghost">Lưu ý</Button>
        <Button variant="ghost">Thông báo</Button>
        <Button variant="ghost">Đánh giá</Button>
      </Flex>
    </Flex>
  );
};

export default CourseMain;
