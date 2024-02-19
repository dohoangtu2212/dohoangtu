import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FC } from "react";
import type { IPaymentMethod } from "@/types/order";
import Image from "next/image";

type PaymentMethodProps = {
  paymentMethod: IPaymentMethod;
  onChange: (method: IPaymentMethod) => void;
};
const PaymentMethod: FC<PaymentMethodProps> = ({ paymentMethod, onChange }) => {
  const tabIndex = paymentMethod === "Bank" ? 0 : 1;

  const handleTabIndexChange = (idx: number) => {
    onChange(idx === 0 ? "Bank" : "Momo");
  };

  return (
    <Flex flexDir="column">
      <Text fontSize="0.875rem">Chọn hình thức thanh toán phù hợp với bạn</Text>
      <Text fontSize="0.875rem">
        Hình thức được chọn sẽ được lưu lại để thuận tiện cho việc xác nhận đơn
        hàng
      </Text>
      <Tabs
        variant="enclosed"
        py="0.5rem"
        isFitted
        index={tabIndex}
        onChange={handleTabIndexChange}
      >
        <TabList>
          <Tab>
            <Text minW="7rem" textAlign="center">
              Chuyển khoản
            </Text>
          </Tab>
          <Tab isDisabled>Momo</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box
              position="relative"
              w="100%"
              h={{ base: "40rem", lg: "30rem" }}
            >
              <Image
                src="/images/payments/bank-qr.png"
                alt="bank"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box position="relative" w="100%" h="20rem">
              <Image
                src="/images/payments/momo-qr.jpg"
                alt="momo"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default PaymentMethod;
