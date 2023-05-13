import { Flex, Text, Box, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { ICourseFormValues } from "@/types/course";
import { FormikHelpers } from "formik";
import Structure from "@/views/Teacher/CoursesNew/Form/Structure";
import Listing from "@/views/Teacher/CoursesNew/Form/Listing";

type StructureProps = {
  values: ICourseFormValues;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};
const Form: FC<StructureProps> = ({
  values,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  return (
    <Flex h="100%" gap="1rem">
      <Box flex="1">
        <Text fontSize="1rem" fontWeight="700">
          Thông tin cửa hàng
        </Text>
        <Listing
          values={values}
          handleSetFieldValue={handleSetFieldValue}
          handleSetFieldTouched={handleSetFieldTouched}
        />
      </Box>
      <Divider orientation="vertical" />
      <Box flex="1" maxH="82vh" overflowY="auto">
        <Text fontSize="1rem" fontWeight="700" pb="1rem">
          Cấu trúc khoá học
        </Text>
        <Structure
          values={values}
          handleSetFieldValue={handleSetFieldValue}
          handleSetFieldTouched={handleSetFieldTouched}
        />
      </Box>
    </Flex>
  );
};

export default Form;
