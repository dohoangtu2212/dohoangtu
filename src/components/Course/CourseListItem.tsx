import { ICourse } from "@/types/course";
import { Card, Text, Flex, Button, Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import DisplayImage from "@/components/UI/DisplayImage";
import { BsCartPlus, BsEye, BsPerson, BsStar } from "react-icons/bs";
import { displayPrice } from "@/utils/display";

type CourseListItemProps = {
  course: ICourse;
};
const CourseListItem: FC<CourseListItemProps> = ({ course }) => {
  const [showMenu, setShowMenu] = useState(false);

  const {
    id,
    name,
    description,
    thumbnailUrl,
    teacherName,
    rating,
    ratingCount,
    hours,
    lessons,
    tag,
    price,
    previousPrice,
  } = course;

  return (
    <Card
      p="1rem"
      cursor="pointer"
      position="relative"
      overflow="hidden"
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {showMenu && (
        <Box position="absolute" w="100%" h="100%" zIndex="10" top="0" left="0">
          <Flex
            w="100%"
            h="100%"
            position="relative"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <Box
              bg="black"
              opacity="0.5"
              w="100%"
              h="100%"
              position="absolute"
            />
            <Button leftIcon={<BsCartPlus size="1.25rem" />}>Bỏ vào giỏ</Button>
            <Button leftIcon={<BsEye size="1.25rem" />}>Xem chi tiết</Button>
          </Flex>
        </Box>
      )}
      <Flex flexDir="column" gap="0.5rem">
        <DisplayImage
          imageUrl={thumbnailUrl}
          w="100%"
          h="10rem"
          alt={name}
          border="1px solid red"
        />
        <Text fontWeight="600" lineHeight="1.25" textTransform="uppercase">
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

        <Text fontSize="0.75rem" color="gray">
          {hours} giờ | {lessons} bài giảng
        </Text>
        <Flex alignItems="flex-end" gap="0.5rem">
          <Text fontWeight="600">{displayPrice(price)}</Text>
          <Text
            fontSize="0.875rem"
            textDecoration="line-through"
            color="gray.500"
          >
            {displayPrice(previousPrice)}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CourseListItem;
