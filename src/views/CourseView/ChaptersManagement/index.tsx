import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";

import type { ICourseChapter } from "@/types/course";
import useMobile from "@/hooks/useMobile";
import NavigateButton from "@/components/UI/NavigateButton";
import { FC } from "react";
import ChapterTitle from "./ChapterTitle";
import ChaptersDrawer from "./ChaptersDrawer";
import { IoMdList } from "react-icons/io";

interface ChaptersManagementProps {
  currentChapter: ICourseChapter;
  chapters: ICourseChapter[];
  onCurrentChapterChange?: (chapter: ICourseChapter) => void;
}
const ChaptersManagement: FC<ChaptersManagementProps> = ({
  currentChapter,
  chapters = [],
  onCurrentChapterChange,
}) => {
  const { isMobile } = useMobile();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const currentChapterIdx = chapters.findIndex(
    (ch) => ch.order === currentChapter.order
  );

  return (
    <>
      <ChaptersDrawer
        isOpen={isOpen}
        onClose={onClose}
        chapters={chapters}
        onSelectChapter={(chapter) => onCurrentChapterChange?.(chapter)}
      />
      <Flex flexDir="column" gap="0.5rem">
        <Flex
          p={{ base: "0 0.5rem", lg: "0.5rem 1rem" }}
          alignItems="center"
          gap="1rem"
          w="100%"
          justifyContent="space-between"
        >
          <Box flex="1">
            <NavigateButton
              variant="outline"
              p="0.5rem"
              w="fit-content"
              h="fit-content"
              onClick={onOpen}
              leftIcon={<IoMdList size="1.25rem" />}
            >
              <Text>Chương</Text>
            </NavigateButton>
          </Box>
          {!isMobile && (
            <Box flex="8">
              <ChapterTitle chapter={currentChapter} />
            </Box>
          )}
          <Box flex="1" />
        </Flex>
        {isMobile && <ChapterTitle chapter={currentChapter} />}
      </Flex>
    </>
  );
};

export default ChaptersManagement;
