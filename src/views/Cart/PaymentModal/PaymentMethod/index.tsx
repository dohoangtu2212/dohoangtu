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
  const tabIndex = paymentMethod === "VCB" ? 0 : 1;

  const handleTabIndexChange = (idx: number) => {
    onChange(idx === 0 ? "VCB" : "Momo");
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
            <Text fontSize="0.75rem" minW="7rem" textAlign="center">
              VCB <br />
              (Chuyển khoản)
            </Text>
          </Tab>
          <Tab>Momo</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box position="relative" w="100%" h="20rem">
              <Image
                src="/images/vcb-qr.jpg"
                alt="vcb"
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
                src="/images/momo-qr.jpg"
                alt="vcb"
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
