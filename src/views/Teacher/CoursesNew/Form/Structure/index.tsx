import type { ICourseFormValues } from "@/types/course";
import type { FormikHelpers } from "formik";
import type { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { ICourseLessonType } from "@/types/course";
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
  const handleAddNewSection = useCallback(() => {
    const { sections } = values;
    const order = !sections.length
      ? 1
      : sections[sections.length - 1].order + 1;
    handleSetFieldValue(`sections`, [
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
    handleSetFieldValue("lessons", values.lessons + 1);
  }, [values, handleSetFieldValue]);

  return (
    <Flex flexDir="column" alignItems="flex-start" gap="1rem">
      <Sections
        values={values}
        handleSetFieldValue={handleSetFieldValue}
        handleSetFieldTouched={handleSetFieldTouched}
      />
      <Button leftIcon={<MdAdd />} onClick={handleAddNewSection}>
        Thêm CHƯƠNG
      </Button>
    </Flex>
  );
};

export default Structure;
