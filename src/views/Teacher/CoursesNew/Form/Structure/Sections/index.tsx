import {
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  InputProps,
  IconButton,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { FC, useCallback } from "react";
import {
  ICourseLesson,
  ICourseLessonType,
  ICourseSection,
} from "@/types/course";
import SectionTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/SectionTitle";
import Lessons from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons";
import { MdOutlineDelete } from "react-icons/md";
import { COLORS } from "@/constants/theme/colors";

type SectionsProps = {
  sections: ICourseSection[];
  onSectionsChange: (sections: ICourseSection[]) => void;
};
const Sections: FC<SectionsProps> = ({ sections = [], onSectionsChange }) => {
  const handleAddSection = useCallback(() => {
    const order = !sections.length
      ? 1
      : (sections[sections.length - 1].order as number) + 1;

    onSectionsChange([
      ...sections,
      {
        order,
        name: "",
        lessons: [
          {
            order: 1,
            name: "",
            type: ICourseLessonType.video,
            duration: 0,
            dyntubeKey: "",
          },
        ],
      },
    ]);
  }, [sections, onSectionsChange]);

  return (
    <Flex flexDir="column" gap="1rem">
      <Flex flexDir="column" gap="0.5rem">
        {sections.map((section, idx) => {
          const handleSectionTitleChange: InputProps["onChange"] = (ev) => {
            const name = ev.target.value;
            const updatedSection = {
              ...section,
              name,
            };
            const updatedSections = [...sections];
            updatedSections.splice(idx, 1, updatedSection);

            onSectionsChange(updatedSections);
          };

          const handleDeleteSection = () => {
            const sectionsAfterDelete = sections?.filter(
              (sec) => sec.order !== section.order
            );
            const sectionsWithOrderUpdated = sectionsAfterDelete.map(
              (sec, idx) => ({
                ...sec,
                order: idx + 1,
              })
            );
            onSectionsChange(sectionsWithOrderUpdated);
          };

          const handleLessonsChange = (lessons: ICourseLesson[]) => {
            const updatedSection = {
              ...section,
              lessons,
            };
            const updatedSections = [...sections];
            updatedSections.splice(idx, 1, updatedSection);
            onSectionsChange(updatedSections);
          };

          return (
            <Accordion
              w="100%"
              allowMultiple
              borderLeft="1px"
              borderRight="1px"
              borderColor={COLORS.summerBlue}
              maxH="100%"
              overflow="auto"
              key={section.order}
            >
              <AccordionItem>
                <Flex
                  justifyContent="space-between"
                  w="100%"
                  alignItems="center"
                  pl="1rem"
                  gap="1rem"
                >
                  <Box flex="1">
                    <SectionTitle
                      sectionOrder={section.order.toString()}
                      value={section.name}
                      onChange={handleSectionTitleChange}
                    />
                  </Box>
                  <Tooltip label={`Xoá Bài ${section.order.toString()}`}>
                    <IconButton
                      aria-label="delete"
                      p="0"
                      icon={<MdOutlineDelete size="1.5rem" />}
                      variant="ghost"
                      onClick={handleDeleteSection}
                    />
                  </Tooltip>
                  <AccordionButton pl="2rem" w="fit-content" p="1rem">
                    <AccordionIcon />
                  </AccordionButton>
                </Flex>
                <Divider />
                <AccordionPanel>
                  <Lessons
                    section={section}
                    onLessonsChange={handleLessonsChange}
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
      </Flex>
      <Flex justifyContent="flex-end">
        <Button onClick={handleAddSection}>Thêm Bài</Button>
      </Flex>
    </Flex>
  );
};

export default Sections;
