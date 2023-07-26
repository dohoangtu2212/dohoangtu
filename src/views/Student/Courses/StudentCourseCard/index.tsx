import { Flex, Text, Card, Progress } from "@chakra-ui/react";
import { IStudentCourse } from "@/types/course";
import { FC } from "react";
import { BsPerson } from "react-icons/bs";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import PlayableThumbnail from "@/components/Course/PlayableThumbnail";

type StudentCourseCardProps = {
  course: IStudentCourse;
};
const StudentCourseCard: FC<StudentCourseCardProps> = ({ course }) => {
  const {
    thumbnailUrl,
    name,
    teacherName,
    progress,
    courseDetailsId,
    courseId,
  } = course;
  const router = useRouter();

  return (
    <Card variant="unstyled" cursor="pointer" position="relative">
      <Flex flexDir="column" gap="0.5rem">
        <Progress value={progress} h="0.4rem" borderRadius="lg" />
        <PlayableThumbnail
          thumbnailUrl={thumbnailUrl}
          onPlay={() =>
            router.push({
              pathname: ROUTE.studentCourseView,
              query: {
                courseId,
              },
            })
          }
        />
        <Text fontWeight="600" lineHeight="1.25">
          {name}
        </Text>
        <Flex alignItems="center" gap="0.5rem">
          <BsPerson />
          <Text fontSize="0.75rem" color="gray">
            {teacherName}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default StudentCourseCard;
