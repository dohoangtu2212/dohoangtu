import { Button, Flex, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";

const TeacherCourses = () => {
  const router = useRouter();

  const handleCreateCourse = () => {
    router.push(ROUTE.teacherCoursesNew);
  };

  return (
    <Flex flexDir="column">
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontWeight="600" textTransform="uppercase">
          Khoá học đã tạo
        </Text>
        <Button
          leftIcon={<MdAdd size="1.25rem" />}
          onClick={handleCreateCourse}
        >
          Tạo mới
        </Button>
      </Flex>
    </Flex>
  );
};

export default TeacherCourses;
