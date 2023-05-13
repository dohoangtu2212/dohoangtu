import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Spinner,
} from "@chakra-ui/react";
import { useGetCoursesQuery } from "@/store/apis/db";
import { displayPrice } from "@/utils/display";
import DisplayImage from "@/components/UI/DisplayImage";

const CoursesTable = () => {
  const {
    data: courses,
    isLoading: isGetCoursesLoading,
    isFetching: isGetCoursesFetching,
  } = useGetCoursesQuery();

  const isLoading = isGetCoursesFetching || isGetCoursesLoading;

  return (
    <>
      {isLoading && <Spinner color="orange.400" />}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th />
              <Th>Tên</Th>
              <Th>Giáo viên</Th>
              <Th>Số bài giảng</Th>
              <Th>Giá tiền</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {courses?.map((course) => (
              <Tr key={course.id}>
                <Td w="10%" minW="fit-content">
                  <DisplayImage
                    alt={course.name}
                    imageUrl={course.thumbnailUrl}
                    w="10rem"
                    h="6rem"
                    borderRadius="lg"
                  />
                </Td>
                <Td>{course.name}</Td>
                <Td>{course.teacherName}</Td>
                <Td>{course.lessons}</Td>
                <Td>{displayPrice(course.price)}</Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CoursesTable;
