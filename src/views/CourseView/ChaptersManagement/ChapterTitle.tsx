import { Text } from "@chakra-ui/react";

import type { ICourseChapter } from "@/types/course";
import { FC } from "react";

interface ChapterTitleProps {
  chapter: ICourseChapter;
}
const ChapterTitle: FC<ChapterTitleProps> = ({ chapter }) => {
  return (
    <Text
      textAlign="center"
      fontSize={{ base: "1rem", lg: "1.25rem" }}
      fontWeight="600"
      flex="1"
    >
      Chương {chapter.order} : ${chapter.name}
    </Text>
  );
};

export default ChapterTitle;
