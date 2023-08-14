import { ICourse } from "@/types/course";
import { Text, Flex, Button, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { BsCartPlus, BsHeart, BsEye } from "react-icons/bs";
import dayjs from "dayjs";
import { cartActions } from "@/store/slices/cart";
import { useDispatch } from "react-redux";
import { useCartCoursesSelector } from "@/store/slices/cart";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { MdCheck, MdCheckCircle } from "react-icons/md";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { COLORS } from "@/constants/theme/colors";

type MenuProps = {
  course: ICourse;
  isPurchased?: boolean;
};
const Menu: FC<MenuProps> = ({ course, isPurchased }) => {
  const { name, description, hours, lessons, updatedAt } = course;
  return (
    <Flex flexDir="column" p="0.5rem" gap="0.5rem">
      <Text fontWeight="600" lineHeight="1.25">
        {name}
      </Text>
      <Text fontSize="0.75rem" lineHeight="0.75rem">
        <Text as="span" color="gray">
          Cập nhật vào{" "}
        </Text>
        <Text fontWeight="600" as="span">
          {dayjs(updatedAt).format("DD/MM/YY").toString()}
        </Text>
      </Text>
      <Text fontSize="0.75rem" color="gray">
        {hours} giờ | {lessons} bài giảng
      </Text>
      <Text fontSize="0.875rem">{description}</Text>
      {!isPurchased && <PublicActions course={course} />}
      {isPurchased && <PrivateActions />}
    </Flex>
  );
};

type PublicActionsProps = {
  course: ICourse;
};
const PublicActions: FC<PublicActionsProps> = ({ course }) => {
  const dispatch = useDispatch();
  const userRole = useUserRoleSelector();
  const cartCourses = useCartCoursesSelector();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(cartActions.addCourse(course));
  };

  const handleGoToCart = () => {
    router.push(ROUTE.cart);
  };

  const isAddedToCard = !!cartCourses.find((c) => c.id === course.id);

  return (
    <Flex pt="1rem" flexDir="column" gap="0.5rem">
      {isAddedToCard && (
        <Flex
          color="orange.400"
          w="fit-content"
          gap="0.5rem"
          alignItems="center"
        >
          <MdCheck size="1.25rem" />
          <Text fontSize="0.75rem" fontWeight="500">
            Đã được thêm vào giỏ
          </Text>
        </Flex>
      )}
      <Flex alignItems="center" gap="1rem">
        {isAddedToCard ? (
          <Button
            leftIcon={<BsEye size="1.25rem" />}
            flex="1"
            variant="outline"
            onClick={handleGoToCart}
            isDisabled={userRole === UserRole.teacher}
          >
            Xem giỏ hàng
          </Button>
        ) : (
          <Button
            leftIcon={<BsCartPlus size="1.25rem" />}
            flex="1"
            onClick={handleAddToCart}
            isDisabled={userRole === UserRole.teacher}
          >
            Bỏ vào giỏ
          </Button>
        )}
        <IconButton
          aria-label="wishlist"
          icon={<BsHeart size="1.25rem" />}
          isDisabled={userRole === UserRole.teacher}
        />
      </Flex>
    </Flex>
  );
};

type PrivateActionsProps = {};
const PrivateActions: FC<PrivateActionsProps> = () => {
  return (
    <Flex
      alignItems="center"
      gap="0.5rem"
      bgColor={COLORS.whiteSatin}
      p="0.25rem 0.5rem"
      borderRadius="lg"
    >
      <MdCheckCircle size="1.25rem" />
      <Text>Bạn đã sở hữu khoá học này</Text>
    </Flex>
  );
};

export default Menu;
