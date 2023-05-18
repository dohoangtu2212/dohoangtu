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
} from "@chakra-ui/react";
import { FC } from "react";
import { ICourseFormValues, ICourseSection } from "@/types/course";
import { FormikHelpers } from "formik";
import SectionTitle from "@/views/Teacher/CoursesNew/Form/Structure/Sections/SectionTitle";
import Lessons from "@/views/Teacher/CoursesNew/Form/Structure/Sections/Lessons";
import { MdOutlineDelete } from "react-icons/md";
import { COLORS } from "@/constants/theme";

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
        const handleSectionTitleChange: InputProps["onChange"] = (ev) => {
          handleSetFieldValue(`sections[${idx}].name`, ev.target.value);
        };

        const handleDeleteSection = (section: ICourseSection) => () => {
          handleSetFieldValue(
            `sections`,
            values.sections.filter((s) => s.order !== section.order)
          );
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
                {section.order.toString() === "0" && (
                  <Tooltip label={`Xoá CHƯƠNG ${section.order.toString()}`}>
                    <IconButton
                      aria-label="delete"
                      icon={<MdOutlineDelete size="1.5rem" />}
                      variant="ghost"
                      onClick={handleDeleteSection(section)}
                    />
                  </Tooltip>
                )}
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
