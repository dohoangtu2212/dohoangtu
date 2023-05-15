import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";
import type { FC } from "react";

type PaymentModalProps = Omit<ModalProps, "children"> & {};
const PaymentModal: FC<PaymentModalProps> = ({ ...modalProps }) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
