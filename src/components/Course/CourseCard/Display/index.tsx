import { ICourse } from "@/types/course";
import { Card, Text, Flex, Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import DisplayImage from "@/components/UI/DisplayImage";
import { BsPerson, BsStar } from "react-icons/bs";
import { displayPrice } from "@/utils/display";
import { useCartCoursesSelector } from "@/store/slices/cart";
import { IoMdCart } from "react-icons/io";
import { DEFAULT_COURSE_THUMBNAIL } from "@/constants/course";
import useMobile from "@/hooks/useMobile";
import { COLORS } from "@/constants/theme";

type DisplayProps = {
  course: ICourse;
  onToggleMenu: (val: boolean) => void;
};
const Display = forwardRef<HTMLDivElement, DisplayProps>(
  ({ course, onToggleMenu = () => {} }, ref) => {
    const { isMobile } = useMobile();
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
        onClick={() => {
          if (isMobile) onToggleMenu(true);
        }}
        ref={ref}
      >
        {isAddedToCard && (
          <Box
            color={COLORS.summerBlue}
            position="absolute"
            zIndex="2"
            right="0.5rem"
            top="0.5rem"
            bgColor={COLORS.starryNightBlue}
            p="0.25rem"
            borderRadius="lg"
          >
            <IoMdCart size="1.5rem" />
          </Box>
        )}
        <Flex flexDir="column" gap="0.5rem">
          <DisplayImage
            imageUrl={
              !!thumbnailUrl ? thumbnailUrl : DEFAULT_COURSE_THUMBNAIL
            }
            w="100%"
            h="10rem"
            alt={name}
            borderRadius="md"
          />
          <Text fontWeight="600" lineHeight="1.25">
            {name}
          </Text>

          <Flex alignItems="center" gap="0.5rem" color={COLORS.twilightBlue}>
            <BsPerson />
            <Text fontSize="0.75rem">{teacherName}</Text>
          </Flex>
          <Flex alignItems="center" gap="0.5rem" color={COLORS.twilightBlue}>
            <BsStar />
            <Text fontSize="0.75rem">
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
                color={COLORS.summerBlue}
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
