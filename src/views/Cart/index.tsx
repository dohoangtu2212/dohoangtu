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
  useToast,
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
import { useCreateOrderMutation } from "@/store/apis/db";
import { INewOrder } from "@/types/order";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart";
import { AiOutlineShop } from "react-icons/ai";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";

const Cart = () => {
  const toast = useToast({
    position: "bottom",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useCurrentUserSelector();
  const cartCourses = useCartCoursesSelector();
  const totalPrice = useCartTotalPriceSelector();
  const {
    isOpen: isAuthModalOpen,
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
  } = useDisclosure();
  const [createOrder, { isLoading: isCreateOrderLoading }] =
    useCreateOrderMutation();

  const handleCheckout = useCallback(async () => {
    if (!currentUser) onOpenAuthModal();

    if (!!currentUser && !!cartCourses && totalPrice) {
      const order: INewOrder = {
        userId: currentUser.uid,
        userName: currentUser.displayName ?? "",
        userEmail: currentUser.email ?? "",
        courses: cartCourses.map((c) => ({
          name: c.name,
          courseId: c.id,
          courseDetailsId: c.courseDetailsId,
          price: c.price,
          teacherName: c.teacherName,
          progress: 0,
          rating: null,
          thumbnailUrl: c.thumbnailUrl,
        })),
        totalPrice: totalPrice,
        createdAt: dayjs().toString(),
        isConfirmed: false,
      };

      try {
        const res = await createOrder(order).unwrap();
        toast({
          title: "Thành công!",
          description: "Đơn hàng đã được tạo.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(cartActions.clearCart());
      } catch (err) {
        toast({
          title: "Lỗi!",
          description: "Tạo đơn hàng không thành công.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [
    currentUser,
    onOpenAuthModal,
    cartCourses,
    totalPrice,
    createOrder,
    toast,
    dispatch,
  ]);

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
            {!!cartCourses.length ? (
              cartCourses.map((course) => (
                <Fragment key={course.id}>
                  <CourseItem course={course} />
                  <Divider />
                </Fragment>
              ))
            ) : (
              <Flex
                h="20rem"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                gap="0.75rem"
              >
                <Text fontWeight="600" fontSize="1.5rem" lineHeight="1.5rem">
                  Giỏ hàng trống
                </Text>
                <Text>Hãy đến cửa hàng và thêm khoá học vào giỏ</Text>
                <Button
                  leftIcon={<AiOutlineShop size="1.25rem" />}
                  onClick={() => router.push(ROUTE.store)}
                >
                  Đến cửa hàng
                </Button>
              </Flex>
            )}
          </Flex>
          {!!totalPrice && (
            <Flex flexDir="column" flex="1" gap="1rem">
              <Box>
                <Text>Tổng giá tiền</Text>
                <Text fontWeight="700" fontSize="1.5rem">
                  {displayPrice(totalPrice)}
                </Text>
              </Box>
              <Button
                w="fit-content"
                px="3rem"
                onClick={handleCheckout}
                isDisabled={!totalPrice}
                isLoading={isCreateOrderLoading}
              >
                Thanh toán
              </Button>
            </Flex>
          )}
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
