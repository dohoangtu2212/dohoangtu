import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";
import PaymentMethod from "@/views/Cart/PaymentModal/PaymentMethod";
import type { FC } from "react";
import type { IPaymentMethod } from "@/types/order";
import { useCartTotalPriceSelector } from "@/store/slices/cart";
import { displayPrice } from "@/utils/display";
import PaymentProof from "@/views/Cart/PaymentModal/PaymentProof";

type PaymentModalProps = Omit<ModalProps, "children"> & {
  onSubmit: () => void;
  paymentMethod: IPaymentMethod;
  onPaymentMethodChange: (method: IPaymentMethod) => void;
  screenshot: File | null;
  onScreenshotChange: (file: File) => void;
  isLoading: boolean;
};
const PaymentModal: FC<PaymentModalProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  screenshot,
  onScreenshotChange,
  onSubmit,
  isLoading,
  ...modalProps
}) => {
  const totalPrice = useCartTotalPriceSelector();

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent w={{ base: "100vw", md: "50rem" }} maxW="none">
        <ModalCloseButton />
        <ModalBody p="1.5rem 2rem">
          <Flex gap="1rem" flexDir={{ base: "column-reverse", lg: "row" }}>
            <Flex flexDir="column" flex="1" gap="1rem">
              <Flex flexDir="column">
                <Text fontWeight="600">GIÁ TRỊ ĐƠN HÀNG</Text>
                <Text fontWeight="700" fontSize="1.5rem">
                  {displayPrice(totalPrice)}
                </Text>
              </Flex>
              <Flex flexDir="column" gap="0.5rem">
                <Text fontWeight="600">HÌNH THỨC THANH TOÁN</Text>
                <PaymentMethod
                  paymentMethod={paymentMethod}
                  onChange={onPaymentMethodChange}
                />
              </Flex>
            </Flex>
            <Flex flexDir="column" flex="1" gap="0.5rem">
              <Text fontWeight="600">XÁC THỰC THANH TOÁN</Text>
              <Text fontSize="0.875rem">
                Hãy đính kèm ảnh chụp màn hình của giao dịch thành công để thuận
                tiện việc xác nhận đơn hàng
              </Text>
              <PaymentProof image={screenshot} onChange={onScreenshotChange} />
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <Button
              onClick={onSubmit}
              isLoading={isLoading}
              isDisabled={!paymentMethod || !screenshot}
            >
              Xác nhận thanh toán
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
