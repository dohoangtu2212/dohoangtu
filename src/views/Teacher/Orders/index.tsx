import { Flex, Text } from "@chakra-ui/react";
import OrdersTable from "@/views/Teacher/Orders/OrdersTable";

const TeacherOrders = () => {
  return (
    <Flex flexDir="column" gap="1rem">
      <Text textTransform="uppercase" fontWeight="600">
        Đơn hàng đã nhận
      </Text>
      <OrdersTable />
    </Flex>
  );
};

export default TeacherOrders;
