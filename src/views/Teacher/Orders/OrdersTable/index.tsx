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
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useGetOrdersQuery } from "@/store/apis/db";
import { IOrder } from "@/types/order";
import { FC } from "react";
import { displayPrice } from "@/utils/display";
import dayjs from "dayjs";
import { MdCheck } from "react-icons/md";
import {
  useUpdateStudentCoursesMutation,
  useConfirmOrderMutation,
} from "@/store/apis/db";
import { IStudentCourse } from "@/types/course";

const OrdersTable = () => {
  const {
    data: orders = [],
    isLoading: isGetOrdersLoading,
    isFetching: isGetOrdersFetching,
  } = useGetOrdersQuery();

  const isLoading = isGetOrdersLoading || isGetOrdersFetching;

  return (
    <>
      {isLoading && <Spinner color="orange.400" />}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Học sinh</Th>
              <Th>Thời gian</Th>
              <Th>Khoá học bao gồm</Th>
              <Th>Giá trị đơn hàng</Th>

              {/* Actions */}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr key={order.id}>
                <TdStudent order={order} />
                <Td>{dayjs(order.createdAt).format("DD/MM/YY HH:mm:ss")}</Td>
                <TdCourses order={order} />
                <Td>{displayPrice(order.totalPrice)}</Td>
                <TdActions order={order} />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

type TdStudentProps = {
  order: IOrder;
};
const TdStudent: FC<TdStudentProps> = ({ order }) => {
  const { userEmail, userName, userId } = order;
  return (
    <Td>
      <Flex justifyContent="center" flexDir="column" gap="0.5rem">
        <Text>
          <Text as="span" fontSize="0.75rem">
            Tên:{" "}
          </Text>
          <Text as="span">{!!userName ? userName : "(trống)"}</Text>
        </Text>
        <Text>
          <Text as="span" fontSize="0.75rem">
            Email:{" "}
          </Text>
          <Text as="span">{!!userEmail ? userEmail : "(trống)"}</Text>
        </Text>
      </Flex>
    </Td>
  );
};

type TdCoursesProps = {
  order: IOrder;
};
const TdCourses: FC<TdCoursesProps> = ({ order }) => {
  const { courses } = order;
  return (
    <Td>
      <Flex flexDir="column">
        {courses.map((c, idx) => (
          <>
            {!!idx && <Divider />}
            <Flex alignItems="center" gap="2rem">
              <Text
                maxW="15rem"
                fontSize="0.75rem"
                textOverflow="clip"
                overflow="hidden"
                whiteSpace="initial"
              >
                {c.name}
              </Text>
              <Text fontSize="0.75rem">{displayPrice(c.price)}</Text>
            </Flex>
          </>
        ))}
      </Flex>
    </Td>
  );
};

type TdActionsProps = {
  order: IOrder;
};
const TdActions: FC<TdActionsProps> = ({ order }) => {
  const [updateStudentCourses, { isLoading: isUpdateStudentCoursesLoading }] =
    useUpdateStudentCoursesMutation();
  const [confirmOrder, { isLoading: isConfirmModalLoading }] =
    useConfirmOrderMutation();
  const { isConfirmed, userName, userEmail } = order;

  const handleConfirm = async () => {
    await updateStudentCourses({
      userId: order.userId,
      courses: order.courses,
    });
    await confirmOrder({ orderId: order.id });
  };

  const isSubmitting = isUpdateStudentCoursesLoading || isConfirmModalLoading;

  return (
    <Td>
      {isConfirmed ? (
        <Flex alignItems="center" gap="0.5rem">
          <MdCheck />
          <Text>Đã xác nhận</Text>
        </Flex>
      ) : (
        <Flex flexDir="column" gap="1rem" alignItems="center" w="10rem">
          <Button onClick={handleConfirm} isLoading={isSubmitting}>
            Xác nhận
          </Button>
          <Text
            fontSize="0.75rem"
            lineHeight="0.75rem"
            textAlign="center"
            textOverflow="clip"
            overflow="hidden"
            whiteSpace="initial"
          >
            Các khoá học trong đơn hàng sẽ được thêm cho học sinh{" "}
            <Text as="span" fontWeight="600">
              {!!userName ? userName : userEmail}
            </Text>
          </Text>
        </Flex>
      )}
    </Td>
  );
};

export default OrdersTable;
