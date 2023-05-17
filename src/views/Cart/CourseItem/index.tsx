import { ICourse } from "@/types/course";
import { Card, Text, Flex, Box, Button } from "@chakra-ui/react";
import DisplayImage from "@/components/UI/DisplayImage";
import { BsPerson, BsStar } from "react-icons/bs";
import { displayPrice } from "@/utils/display";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart";
import { DEFAULT_EXERCISE_THUMBNAIL } from "@/constants/exercise";

type CourseItemProps = {
  course: ICourse;
};
const CourseItem: FC<CourseItemProps> = ({ course }) => {
  const { price } = course;

  return (
    <Card
      variant="unstyled"
      cursor="pointer"
      position="relative"
      direction="row"
      gap="1rem"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Flex w="100%">
        <Basics course={course} />
        <Flex gap="2rem" flex="1">
          <Box flex="1">
            <Actions course={course} />
          </Box>

          <Text fontWeight="600" flex="1" textAlign="right">
            {displayPrice(price)}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

type BasicsProps = {
  course: ICourse;
};
const Basics: FC<BasicsProps> = ({ course }) => {
  const {
    name,
    thumbnailUrl,
    teacherName,
    rating,
    ratingCount,
    price,
    previousPrice,
    hours,
    lessons,
  } = course;
  return (
    <Flex gap="1rem" flex="2">
      <DisplayImage
        imageUrl={!!thumbnailUrl ? thumbnailUrl : DEFAULT_EXERCISE_THUMBNAIL}
        w="10rem"
        h="6rem"
        alt={name}
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
      />
      <Flex flexDir="column" gap="0.25rem">
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
        <Text fontSize="0.75rem" color="gray">
          {hours} giờ | {lessons} bài giảng
        </Text>
      </Flex>
    </Flex>
  );
};

type ActionsProps = {
  course: ICourse;
};
const Actions: FC<ActionsProps> = ({ course }) => {
  const dispatch = useDispatch();
  const handleRemoveFromCard = () => {
    dispatch(cartActions.removeCourse(course));
  };

  return (
    <Flex flexDir="column">
      <Button
        fontSize="0.875rem"
        h="fit-content"
        variant="outline"
        py="0.25rem"
        onClick={handleRemoveFromCard}
      >
        Bỏ khỏi giỏ
      </Button>
    </Flex>
  );
};

export default CourseItem;
