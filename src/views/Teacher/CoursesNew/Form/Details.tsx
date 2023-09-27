import type { ICourseFormValues } from "@/types/course";
import type { FormikHelpers } from "formik";
import { useState, type FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Tiptap from "@/components/Fields/Tiptap";

type DetailsProps = {
  values: ICourseFormValues;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};

const Details: FC<DetailsProps> = ({
  values,
  handleSetFieldTouched,
  handleSetFieldValue,
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(
    values.overview ?? "Cập nhật..."
  );

  const handleChange = (html: string) => {
    handleSetFieldValue("overview", html);
  };

  return (
    <Flex
      flexDir="column"
      alignItems="flex-start"
      gap="1rem"
      py="1rem"
      w="100%"
    >
      <Flex flexDir="column" gap="0.5rem" w="100%">
        <Text>KHÁI QUÁT KHOÁ HỌC</Text>
        <Tiptap defaultValue={defaultValue} onHtmlChange={handleChange} />
      </Flex>
    </Flex>
  );
};

export default Details;
