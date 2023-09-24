import { Flex, useDisclosure } from "@chakra-ui/react";

import type { ICourseChapter } from "@/types/course";
import useMobile from "@/hooks/useMobile";
import NavigateButton from "@/components/UI/NavigateButton";
import { FC } from "react";
import ChapterTitle from "./ChapterTitle";
import ChaptersDrawer from "./ChaptersDrawer";

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

  const handlePrev = () => {
    if (currentChapterIdx > 0) {
      onCurrentChapterChange?.(chapters[currentChapterIdx - 1]);
    }
  };
  const handleNext = () => {
    if (currentChapterIdx < chapters.length - 1) {
      onCurrentChapterChange?.(chapters[currentChapterIdx + 1]);
    }
  };

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
          <NavigateButton
            variant="outline"
            p="0.5rem"
            w="fit-content"
            h="fit-content"
            onClick={onOpen}
          >
            Danh sách chương
          </NavigateButton>
          {!isMobile && <ChapterTitle chapter={currentChapter} />}
          <Flex alignItems="center" gap="0.5rem">
            <NavigateButton
              isDisabled={currentChapterIdx === 0}
              aria-label="prev"
              onClick={handlePrev}
            >
              Chương trước
            </NavigateButton>
            <NavigateButton
              isDisabled={currentChapterIdx === chapters.length - 1}
              aria-label="next"
              onClick={handleNext}
            >
              Chương sau
            </NavigateButton>
          </Flex>
        </Flex>
        {isMobile && <ChapterTitle chapter={currentChapter} />}
      </Flex>
    </>
  );
};

export default ChaptersManagement;
