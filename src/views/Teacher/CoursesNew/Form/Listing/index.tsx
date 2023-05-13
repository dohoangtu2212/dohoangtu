import type { ICourseFormValues } from "@/types/course";
import type { FormikHelpers } from "formik";
import type { FC } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

type ListingProps = {
  values: ICourseFormValues;
  handleSetFieldValue: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldValue"];
  handleSetFieldTouched: FormikHelpers<
    Partial<ICourseFormValues>
  >["setFieldTouched"];
};

const Listing: FC<ListingProps> = ({
  values,
  handleSetFieldValue,
  handleSetFieldTouched,
}) => {
  const handleChangeName = (name: string) => {
    handleSetFieldValue("name", name);
  };

  const handleChangeDescription = (des: string) => {
    handleSetFieldValue("description", des);
  };

  const handleChangePrice = (price: number) => {
    handleSetFieldValue("price", price);
  };

  return (
    <Flex flexDir="column" alignItems="flex-start" gap="1rem" py="1rem">
      <FormControl>
        <FormLabel>TÊN</FormLabel>
        <Input
          type="text"
          placeholder="Nhập tên khoá học"
          value={values.name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>MÔ TẢ</FormLabel>
        <Textarea
          placeholder="Nhập mô tả"
          value={values.description}
          onChange={(e) => handleChangeDescription(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>GIÁ</FormLabel>
        <Input
          type="number"
          placeholder="Nhập giá khoá học"
          value={values.price}
          onChange={(e) => handleChangePrice(e.target.valueAsNumber)}
        />
      </FormControl>
    </Flex>
  );
};

export default Listing;
