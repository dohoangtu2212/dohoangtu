import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import CoursesTable from "@/views/Teacher/Courses/CoursesTable";
import { useDispatch } from "react-redux";
import { courseActions } from "@/store/slices/course";

const TeacherCourses = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateCourse = () => {
    dispatch(courseActions.setEditingCourse(null));
    router.push(ROUTE.teacherCoursesNew);
  };

  return (
    <Flex flexDir="column">
      <Flex alignItems="flex-start" justifyContent="space-between">
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
      <Box py="1rem">
        <CoursesTable />
      </Box>
    </Flex>
  );
};

export default TeacherCourses;
