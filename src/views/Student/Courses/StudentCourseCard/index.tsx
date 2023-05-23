import { Flex, Text, Card, Progress, Box, IconButton } from "@chakra-ui/react";
import DisplayImage from "@/components/UI/DisplayImage";
import { IStudentCourse } from "@/types/course";
import { FC, useState } from "react";
import { DEFAULT_COURSE_THUMBNAIL } from "@/constants/course";
import { BsPerson } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";

type StudentCourseCardProps = {
  course: IStudentCourse;
};
const StudentCourseCard: FC<StudentCourseCardProps> = ({ course }) => {
  const { thumbnailUrl, name, teacherName, progress, courseDetailsId, courseId } = course;
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Card variant="unstyled" cursor="pointer" position="relative">
      <Flex
        flexDir="column"
        gap="0.5rem"
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <Box position="relative" borderRadius="md" overflow="hidden">
          <Flex
            position="absolute"
            w="100%"
            h="100%"
            bgColor="blackAlpha.500"
            zIndex="10"
            alignItems="center"
            justifyContent="center"
            hidden={!showMenu}
          >
            <IconButton
              aria-label="play"
              borderRadius="50%"
              w="3rem"
              h="3rem"
              p="0"
              icon={<MdPlayArrow size="1.75rem" />}
              onClick={() =>
                router.push({
                  pathname: ROUTE.studentCourseView,
                  query: {
                    courseId,
                  },
                })
              }
            />
          </Flex>
          <DisplayImage
            imageUrl={
              !!thumbnailUrl ? thumbnailUrl : DEFAULT_COURSE_THUMBNAIL
            }
            w="100%"
            h="10rem"
            alt={name}
            border="1px"
            borderColor="gray.300"
          />
        </Box>
        <Text fontWeight="600" lineHeight="1.25">
          {name}
        </Text>

        <Flex alignItems="center" gap="0.5rem">
          <BsPerson />
          <Text fontSize="0.75rem" color="gray">
            {teacherName}
          </Text>
        </Flex>
        <Progress value={progress} h="0.4rem" borderRadius="lg" />
      </Flex>
    </Card>
  );
};

export default StudentCourseCard;
