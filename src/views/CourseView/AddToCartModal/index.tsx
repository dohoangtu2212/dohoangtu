import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/react";
import type { FC } from "react";
import { IoMdCart } from "react-icons/io";

type AddToCartModalProps = Omit<ModalProps, "children"> & {
  onAddToCart: () => void;
};
const AddToCartModal: FC<AddToCartModalProps> = ({
  onAddToCart,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent w="25rem">
        <ModalCloseButton />
        <ModalBody
          as={Flex}
          flexDir="column"
          gap="1rem"
          py="2rem"
          alignItems="center"
        >
          <Text fontSize="1.25rem" textAlign="center">
            Hãy mua khoá học để xem toàn bộ bài giảng
          </Text>
          <Button leftIcon={<IoMdCart size="1.25rem" />} onClick={onAddToCart}>
            Thêm vào giỏ và thanh toán
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddToCartModal;
