import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Spinner,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useGetCoursesQuery } from "@/store/apis/db";
import { displayPrice } from "@/utils/display";
import DisplayImage from "@/components/UI/DisplayImage";
import { MdPlayArrow, MdOutlineEdit } from "react-icons/md";
import { ICourse } from "@/types/course";
import { useDispatch } from "react-redux";
import { courseActions } from "@/store/slices/course";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { DEFAULT_COURSE_THUMBNAIL } from "@/constants/course";
import { FC } from "react";

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
              <Th>Thumbnail</Th>
              <Th>Tên</Th>
              <Th>Giáo viên</Th>
              <Th>Số bài giảng</Th>
              <Th>Thời lượng</Th>
              <Th>Giá tiền</Th>
              <Th>Giá tham chiếu</Th>

              {/* Actions */}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {courses?.map((course) => (
              <Tr key={course.id}>
                <TdThumbnail course={course} />
                <Td
                  maxW="15rem"
                  textOverflow="clip"
                  overflow="hidden"
                  whiteSpace="initial"
                >
                  {course.name}
                </Td>
                <TdTeacherName course={course} />
                <Td>{course.lessons}</Td>
                <Td>{course.hours} giờ</Td>
                <Td>{displayPrice(course.price)}</Td>
                <TdPreviousPrice course={course} />
                <TdActions course={course} />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

type TdThumbnailProps = {
  course: ICourse;
};
const TdThumbnail: FC<TdThumbnailProps> = ({ course }) => {
  return (
    <Td w="10%" minW="fit-content">
      <DisplayImage
        alt={course.name}
        imageUrl={
          !!course.thumbnailUrl
            ? course.thumbnailUrl
            : DEFAULT_COURSE_THUMBNAIL
        }
        w="10rem"
        h="6rem"
        borderRadius="lg"
      />
    </Td>
  );
};

type TdTeacherNameProps = {
  course: ICourse;
};
const TdTeacherName: FC<TdTeacherNameProps> = ({ course }) => {
  if (!!course.teacherName) {
    return <Td>{course.teacherName}</Td>;
  }

  return (
    <Td>
      <Text color="gray" fontSize="0.75rem">
        Chưa cập nhật
      </Text>
    </Td>
  );
};

type TdPreviousPriceProps = {
  course: ICourse;
};
const TdPreviousPrice: FC<TdPreviousPriceProps> = ({ course }) => {
  if (!!course.previousPrice) {
    return <Td>{displayPrice(course.previousPrice)}</Td>;
  }

  return (
    <Td>
      <Text color="gray" fontSize="0.75rem">
        Chưa cập nhật
      </Text>
    </Td>
  );
};

type TdActionsProps = {
  course: ICourse;
};
const TdActions: FC<TdActionsProps> = ({ course }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      courseActions.setEditingCourse({
        courseId: course.id,
        courseDetailsId: course.courseDetailsId ?? "",
      })
    );
    router.push(ROUTE.teacherCoursesNew);
  };

  const handleView = () =>
    router.push({
      pathname: ROUTE.teacherCourseView,
      query: {
        courseId: course.id,
      },
    });

  return (
    <Td>
      <Flex flexDir="column" gap="0.5rem" alignItems="center">
        <Tooltip label="Xem khoá học" placement="left">
          <IconButton
            aria-label="play"
            variant="ghost"
            icon={<MdPlayArrow size="1.75rem" />}
            p="0"
            onClick={handleView}
          />
        </Tooltip>
        <Tooltip label="Chỉnh sửa" placement="left">
          <IconButton
            aria-label="Edit"
            variant="ghost"
            p="0"
            icon={<MdOutlineEdit size="1.5rem" />}
            onClick={handleEdit}
          />
        </Tooltip>
      </Flex>
    </Td>
  );
};

export default CoursesTable;
