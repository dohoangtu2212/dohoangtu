import {
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
import { FC } from "react";
import type { EditableProps } from "@chakra-ui/react";
import { ICourseFormValues } from "@/types/course";
import { FormikHelpers } from "formik";
import SectionTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/SectionTitle";
import Lessons from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons";

type SectionsProps = {
  values: ICourseFormValues;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};
const Sections: FC<SectionsProps> = ({
  values,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const sections = values.sections ?? [];
  return (
    <>
      {sections.map((section, idx) => {
        const handleSectionTitleChange: EditableProps["onChange"] = (val) => {
          handleSetFieldValue(`sections[${idx}].name`, val);
        };

        return (
          <Accordion
            w="100%"
            allowMultiple
            borderLeft="1px"
            borderRight="1px"
            borderColor="gray.300"
            maxH="100%"
            overflow="auto"
            key={section.order}
          >
            <AccordionItem>
              <Flex
                justifyContent="space-between"
                w="100%"
                alignItems="center"
                p="0.5rem 1rem"
                gap="1rem"
              >
                <Box flex="1">
                  <SectionTitle
                    sectionOrder={section.order.toString()}
                    value={section.name}
                    onChange={handleSectionTitleChange}
                  />
                </Box>
                <AccordionButton pl="2rem" w="fit-content" p="1rem">
                  <AccordionIcon />
                </AccordionButton>
              </Flex>
              <Divider />
              <AccordionPanel>
                <Lessons
                  values={values}
                  section={section}
                  sectionIdx={idx}
                  handleSetFieldValue={handleSetFieldValue}
                  handleSetFieldTouched={handleSetFieldTouched}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
};

export default Sections;
