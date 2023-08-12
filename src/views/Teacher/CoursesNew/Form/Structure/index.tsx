import type {
  ICourseChapter,
  ICourseFormValues,
  ICourseSection,
} from "@/types/course";
import type { FormikHelpers } from "formik";
import type { FC } from "react";
import {
  Flex,
  Button,
  Text,
  Divider,
  Box,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { ICourseFormFields, ICourseLessonType } from "@/types/course";
import Sections from "@/views/Teacher/CoursesNew/Form/Structure/Sections";
import { MdAdd } from "react-icons/md";

type StructureProps = {
  values: ICourseFormValues;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};
const Structure: FC<StructureProps> = ({
  values,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const { chapters } = values;
  const handleAddNewChapter = useCallback(() => {
    const { chapters } = values;
    const order = !chapters.length
      ? 1
      : chapters[chapters.length - 1].order + 1;
    handleSetFieldValue(ICourseFormFields.chapters, [
      ...chapters,
      {
        order,
        name: `Chương ${order}`,
        sections: [
          {
            order: 0,
            name: "Giới thiệu",
            lessons: [
              {
                order: 1,
                name: "Giới thiệu",
                type: ICourseLessonType.video,
                duration: 0,
                dyntubeKey: "",
              },
            ],
          },
        ],
      },
    ]);
  }, [values, handleSetFieldValue]);

  const handleChaptersChange = (chapters: ICourseChapter[]) => {
    handleSetFieldValue(ICourseFormFields.chapters, chapters);
  };

  return (
    <Flex flexDir="column" alignItems="flex-start" gap="0.5rem">
      {chapters.map((chapter, idx) => {
        const { sections, order, name } = chapter;

        const handleChapterTitleChange: InputProps["onChange"] = (ev) => {
          const name = ev.target.value;
          const updatedChapter = {
            ...chapter,
            name,
          };
          const updatedChapters = [...chapters];
          updatedChapters.splice(idx, 1, updatedChapter);

          handleChaptersChange(updatedChapters);
        };

        const handleSectionsChange = (sections: ICourseSection[]) => {
          const updatedChapter = {
            ...chapter,
            sections,
          };
          const updatedChapters = [...chapters];
          updatedChapters.splice(idx, 1, updatedChapter);

          handleChaptersChange(updatedChapters);
        };

        return (
          <Flex key={`chapter-${idx}`} flexDir="column" w="100%" gap="0.5rem">
            <Flex
              alignItems="center"
              gap="0.5rem"
              fontSize="0.875rem"
              fontWeight="500"
              w="100%"
            >
              <Box>
                <Text w="max-content" fontWeight="600">
                  CHƯƠNG {order}:
                </Text>
              </Box>
              <Input
                type="text"
                variant="flushed"
                value={name}
                onChange={handleChapterTitleChange}
              />
            </Flex>
            <Sections
              sections={sections}
              onSectionsChange={handleSectionsChange}
            />
            <Divider />
          </Flex>
        );
      })}

      <Button
        leftIcon={<MdAdd />}
        onClick={handleAddNewChapter}
        variant="outline"
      >
        Thêm CHƯƠNG
      </Button>
    </Flex>
  );
};

export default Structure;
