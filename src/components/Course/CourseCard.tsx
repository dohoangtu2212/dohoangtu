import { ICourse } from "@/types/course";
import {
  Card,
  Text,
  Flex,
  Button,
  Box,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverAnchor,
  IconButton,
} from "@chakra-ui/react";
import { FC, forwardRef, useState } from "react";
import DisplayImage from "@/components/UI/DisplayImage";
import { BsCartPlus, BsPerson, BsStar, BsHeart } from "react-icons/bs";
import { displayPrice } from "@/utils/display";
import dayjs from "dayjs";

type CourseCardProps = {
  course: ICourse;
};
const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box onMouseLeave={() => setShowMenu(false)} px="0.5rem">
      <Popover isOpen={showMenu} placement="right">
        <PopoverAnchor>
          <CardDisplay
            course={course}
            onToggleMenu={(val) => setShowMenu(val)}
          />
        </PopoverAnchor>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Menu course={course} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

type MenuProps = {
  course: ICourse;
};
const Menu: FC<MenuProps> = ({ course }) => {
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
      <Flex alignItems="center" gap="1rem" pt="1rem">
        <Button leftIcon={<BsCartPlus size="1.25rem" />} flex="1">
          Bỏ vào giỏ
        </Button>
        <IconButton aria-label="wishlist" icon={<BsHeart size="1.25rem" />} />
      </Flex>
    </Flex>
  );
};

type CardDisplayProps = {
  course: ICourse;
  onToggleMenu: (val: boolean) => void;
};
const CardDisplay = forwardRef<HTMLDivElement, CardDisplayProps>(
  ({ course, onToggleMenu = () => {} }, ref) => {
    const {
      name,
      thumbnailUrl,
      teacherName,
      rating,
      ratingCount,
      price,
      previousPrice,
    } = course;

    return (
      <Card
        variant="unstyled"
        cursor="pointer"
        position="relative"
        onMouseOver={() => onToggleMenu(true)}
        ref={ref}
      >
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
              Đánh giá: {`${rating}/5`} ({ratingCount.toLocaleString()})
            </Text>
          </Flex>
          <Flex alignItems="flex-end" gap="0.5rem">
            <Text fontWeight="600">{displayPrice(price)}</Text>
            <Text
              fontSize="0.875rem"
              textDecoration="line-through"
              color="gray"
            >
              {displayPrice(previousPrice)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  }
);
CardDisplay.displayName = "CardDisplay";

export default CourseCard;
