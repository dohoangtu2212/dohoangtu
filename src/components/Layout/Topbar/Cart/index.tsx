import { MdOutlineShoppingCart } from "react-icons/md";
import { IconButton, Box, Text, Flex } from "@chakra-ui/react";
import type { FC } from "react";
import type { FlexProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { useCartCoursesSelector } from "@/store/slices/cart";
import { COLORS } from "@/constants/theme/colors";

const Cart = () => {
  const router = useRouter();
  const cartCourses = useCartCoursesSelector();

  const handleGoToCard = () => {
    router.push(ROUTE.cart);
  };

  return (
    <Box position="relative">
      {!!cartCourses.length && <Counter count={cartCourses.length} />}
      <IconButton
        icon={<MdOutlineShoppingCart size="1.5rem" />}
        color={COLORS.whiteSatin}
        p="0"
        aria-label="cart"
        variant="ghost"
        onClick={handleGoToCard}
      />
    </Box>
  );
};

type CounterProps = FlexProps & {
  count: number;
};
const Counter: FC<CounterProps> = ({ count }) => {
  return (
    <Flex
      position="absolute"
      top="-0.125rem"
      right="-0.125rem"
      bgColor={COLORS.blueLapis}
      color={COLORS.whiteSatin}
      w="1.25rem"
      h="1.25rem"
      borderRadius="1rem"
      alignItems="center"
      justifyContent="center"
      zIndex="10"
    >
      <Text fontSize="0.75rem" fontWeight="700" color="white">
        {count}
      </Text>
    </Flex>
  );
};

export default Cart;
