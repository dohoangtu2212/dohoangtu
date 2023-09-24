import {
  Divider,
  DrawerProps,
  Flex,
  Text,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { MdPlayArrow } from "react-icons/md";
import type { ICourseChapter } from "@/types/course";
import { FC } from "react";
import IconNavigateButton from "@/components/UI/IconNavigateButton";

interface ChaptersDrawerProps extends Omit<DrawerProps, "children"> {
  chapters: ICourseChapter[];
  onSelectChapter: (chapter: ICourseChapter) => void;
}
const ChaptersDrawer: FC<ChaptersDrawerProps> = ({
  chapters,
  onSelectChapter,
  ...drawersProps
}) => {
  const { onClose } = drawersProps;

  const handleSelect = (chapter: ICourseChapter) => () => {
    onSelectChapter(chapter);
    onClose();
  };

  return (
    <Drawer placement="left" {...drawersProps}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>Danh sách chương</Text>
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDir="column" gap="1rem">
            {chapters.map((chapter) => {
              const { name, order, sections = [] } = chapter;

              return (
                <Flex key={chapter.order} flexDir="column" gap="0.25rem">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text fontWeight="600">
                      Chương {order} : {name}
                    </Text>
                    <Tooltip label="Chọn">
                      <IconNavigateButton
                        icon={<MdPlayArrow size="2rem" />}
                        aria-label="play"
                        onClick={handleSelect(chapter)}
                      />
                    </Tooltip>
                  </Flex>
                  <UnorderedList>
                    {sections.map((section) => {
                      const {
                        order: secOrder,
                        name: secName,
                        lessons,
                      } = section;
                      return (
                        <ListItem key={secOrder}>
                          <Flex flexDir="column">
                            <Text>
                              Bài {secOrder} : {secName}
                            </Text>
                            <UnorderedList flexDir="column">
                              {lessons.map((lesson) => {
                                const { name: lesName, order: lesOrder } =
                                  lesson;

                                return (
                                  <ListItem key={lesOrder}>
                                    <Text>
                                      {secOrder}.{lesOrder} : {lesName}
                                    </Text>
                                  </ListItem>
                                );
                              })}
                            </UnorderedList>
                          </Flex>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                  <Divider my="0.5rem" />
                </Flex>
              );
            })}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ChaptersDrawer;
