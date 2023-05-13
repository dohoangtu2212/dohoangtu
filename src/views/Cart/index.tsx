import {
  Button,
  Flex,
  Text,
  Box,
  Divider,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import {
  useCartCoursesSelector,
  useCartTotalPriceSelector,
} from "@/store/slices/cart";
import { displayPrice } from "@/utils/display";
import CourseItem from "@/views/Cart/CourseItem";
import { Fragment, useCallback } from "react";
import AuthForm from "@/views/Auth/AuthForm";
import { DisplayMode } from "@/views/Auth/AuthForm/types";
import type { ModalProps } from "@chakra-ui/react";
import type { FC } from "react";
import { useCurrentUserSelector } from "@/store/slices/user";

const Cart = () => {
  const currentUser = useCurrentUserSelector();
  const cartCourses = useCartCoursesSelector();
  const totalPrice = useCartTotalPriceSelector();
  const {
    isOpen: isAuthModalOpen,
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
  } = useDisclosure();

  const handleCheckout = useCallback(() => {
    if (!currentUser) onOpenAuthModal();
  }, [currentUser, onOpenAuthModal]);

  return (
    <>
      <Flex flexDir="column">
        <Text textTransform="uppercase" fontWeight="600">
          Giỏ hàng của bạn
        </Text>
        <Flex py="2rem" gap="4rem">
          <Flex flexDir="column" flex="3" gap="0.5rem">
            <Text
              fontWeight="600"
              color="gray"
            >{`Có ${cartCourses.length} khoá học trong giỏ`}</Text>
            <Divider />
            {cartCourses.map((course) => (
              <Fragment key={course.id}>
                <CourseItem course={course} />
                <Divider />
              </Fragment>
            ))}
          </Flex>
          <Flex flexDir="column" flex="1" gap="1rem">
            <Box>
              <Text>Tổng giá tiền</Text>
              <Text fontWeight="700" fontSize="1.5rem">
                {displayPrice(totalPrice)}
              </Text>
            </Box>
            <Button w="fit-content" px="3rem" onClick={handleCheckout}>
              Thanh toán
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={onCloseAuthModal}
        onLoggedIn={onCloseAuthModal}
      />
    </>
  );
};

type AuthModalProps = Omit<ModalProps, "children"> & {
  onLoggedIn: () => void;
};
const AuthModal: FC<AuthModalProps> = ({ onLoggedIn, ...modalProps }) => {
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent maxW="none" w="fit-content">
        <ModalCloseButton />
        <ModalBody w="fit-content">
          <AuthForm mode={DisplayMode.modal} onLoggedIn={onLoggedIn} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
