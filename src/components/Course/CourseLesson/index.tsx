import { ICourseLesson, ICourseLessonType } from "@/types/course";
import {
  Box,
  Text,
  Flex,
  Checkbox,
  FlexProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { FC } from "react";
import { MdOndemandVideo, MdAssignment } from "react-icons/md";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { COLORS } from "@/constants/theme/colors";
import Link from "next/link";
dayjs.extend(duration);

type CourseLessonProps = {
  lesson: ICourseLesson;
  lessonOrder?: string;
  onClick: FlexProps["onClick"];
  isActive?: boolean;
  isDisabled?: boolean;
  showViewCount?: boolean;
  viewsCount?: number;
};
const CourseLesson: FC<CourseLessonProps> = ({
  lesson,
  onClick,
  isActive,
  isDisabled,
  lessonOrder,
  showViewCount,
  viewsCount,
}) => {
  const { name, type, links = [] } = lesson;

  return (
    <Flex
      alignItems="flex-start"
      p="0.5rem"
      borderRadius="lg"
      gap="1rem"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      bgColor={isActive ? COLORS.whiteSatin : "initial"}
      onClick={onClick}
    >
      <Box py="0.125rem">
        <Checkbox isChecked={!!viewsCount} isDisabled />
      </Box>
      <Flex flexDir="column" gap="0.5rem" w="100%">
        <Flex alignItems="flex-start" gap="1rem" w="100%">
          <Box w="100%">
            <Text fontSize="0.875rem" fontWeight="600">
              {!!lessonOrder
                ? `${lessonOrder} : ${name}
`
                : `${name}`}
            </Text>
            <Flex
              alignItems="center"
              color="gray.500"
              justifyContent="space-between"
              w="100%"
            >
              <Flex alignItems="center" gap="0.5rem">
                {type === ICourseLessonType.video ? (
                  <Flex alignItems="center" gap="0.25rem">
                    <MdOndemandVideo />
                    <Text fontSize="0.75rem">Video</Text>
                  </Flex>
                ) : (
                  <MdAssignment />
                )}
              </Flex>
              {showViewCount && (
                <Text fontSize="0.675rem">Lượt xem: {viewsCount}/20</Text>
              )}
            </Flex>
          </Box>
        </Flex>
        {!!links.length && (
          <Flex onClick={(ev) => ev.stopPropagation()} w="100%">
            <Accordion allowToggle w="100%" border="none">
              <AccordionItem border="none">
                <AccordionButton>
                  <Text
                    fontWeight="500"
                    fontSize="0.875rem"
                    w="100%"
                    textAlign="left"
                  >
                    Tài liệu học tập
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <OrderedList>
                    <Flex flexDir="column" gap="0.5rem">
                      {links.map((link, idx) => {
                        return (
                          <ListItem key={`link-${idx}`}>
                            <Link href={link} passHref={true} target="_blank">
                              <Text
                                textDecoration="underline"
                                fontSize="0.875rem"
                              >
                                {link}
                              </Text>
                            </Link>
                          </ListItem>
                        );
                      })}
                    </Flex>
                  </OrderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CourseLesson;
