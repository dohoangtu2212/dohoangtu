import { ICourse } from "@/types/course";
import { Card, Text, Flex, Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import DisplayImage from "@/components/UI/DisplayImage";
import { BsPerson, BsStar } from "react-icons/bs";
import { displayPrice } from "@/utils/display";
import { useCartCoursesSelector } from "@/store/slices/cart";
import { IoMdCart } from "react-icons/io";

type DisplayProps = {
  course: ICourse;
  onToggleMenu: (val: boolean) => void;
};
const Display = forwardRef<HTMLDivElement, DisplayProps>(
  ({ course, onToggleMenu = () => {} }, ref) => {
    const cartCourses = useCartCoursesSelector();
    const {
      name,
      thumbnailUrl,
      teacherName,
      rating,
      ratingCount,
      price,
      previousPrice,
    } = course;

    const isAddedToCard = !!cartCourses.find((c) => c.id === course.id);

    return (
      <Card
        variant="unstyled"
        cursor="pointer"
        position="relative"
        onMouseOver={() => onToggleMenu(true)}
        ref={ref}
      >
        {isAddedToCard && (
          <Box
            color="orange.400"
            position="absolute"
            zIndex="2"
            right="0.5rem"
            top="0.5rem"
            bgColor="blackAlpha.700"
            p="0.25rem"
            borderRadius="lg"
          >
            <IoMdCart size="1.5rem" />
          </Box>
        )}
        <Flex flexDir="column" gap="0.5rem">
          <DisplayImage
            imageUrl={thumbnailUrl}
            w="100%"
            h="10rem"
            alt={name}
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
          />
          <Text fontWeight="600" lineHeight="1.25">
            {name}
          </Text>

          <Flex alignItems="center" gap="0.5rem">
            <BsPerson />
            <Text fontSize="0.75rem" color="gray">
              {teacherName}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="0.5rem">
            <BsStar />
            <Text fontSize="0.75rem" color="gray">
              <Text as="span">
                Đánh giá: {!!rating ? `${rating}/5` : "Cập nhật..."}
              </Text>{" "}
              {!!ratingCount && (
                <Text as="span">({ratingCount?.toLocaleString()})</Text>
              )}
            </Text>
          </Flex>
          <Flex alignItems="flex-end" gap="0.5rem">
            <Text fontWeight="600">{displayPrice(price)}</Text>
            {!!previousPrice && (
              <Text
                fontSize="0.875rem"
                textDecoration="line-through"
                color="gray"
              >
                {displayPrice(previousPrice)}
              </Text>
            )}
          </Flex>
        </Flex>
      </Card>
    );
  }
);
Display.displayName = "Display";

export default Display;
