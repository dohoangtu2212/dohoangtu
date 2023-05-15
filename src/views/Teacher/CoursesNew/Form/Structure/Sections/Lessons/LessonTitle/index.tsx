import { Flex, Text, Input, InputProps, Box } from "@chakra-ui/react";
import { FC } from "react";

type LessonTitleProps = InputProps & {
  lessonOrder: string;
};
const LessonTitle: FC<LessonTitleProps> = ({ lessonOrder, ...inputProps }) => {
  return (
    <Flex
      alignItems="center"
      gap="0.5rem"
      fontSize="0.875rem"
      fontWeight="500"
      w="100%"
    >
      <Box>
        <Text w="max-content">Bài {lessonOrder}:</Text>
      </Box>
      <Input type="text" {...inputProps} variant="flushed" />
    </Flex>
  );
};

export default LessonTitle;
