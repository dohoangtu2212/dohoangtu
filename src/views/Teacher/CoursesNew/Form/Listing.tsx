import { ICourseFormFields, type ICourseFormValues } from "@/types/course";
import type { FormikHelpers } from "formik";
import type { FC } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Switch,
} from "@chakra-ui/react";
import { displayPrice } from "@/utils/display";
import FileInput from "@/components/Input/FileInput";
import { useCallback, useEffect, useState } from "react";
import DisplayImage from "@/components/UI/DisplayImage";

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
  const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState("");

  const handleChangeName = (name: string) => {
    handleSetFieldValue(ICourseFormFields.name, name);
  };

  const handleChangeTeacherName = (name: string) => {
    handleSetFieldValue(ICourseFormFields.teacherName, name);
  };

  const handleChangeDescription = (des: string) => {
    handleSetFieldValue(ICourseFormFields.description, des);
  };

  const handleChangePrice = (price: number) => {
    handleSetFieldValue(ICourseFormFields.price, price);
  };
  const handleChangePreviousPrice = (price: number) => {
    handleSetFieldValue(ICourseFormFields.previousPrice, price);
  };
  const handleChangeShowInStore = (show: boolean) => {
    handleSetFieldValue(ICourseFormFields.showInStore, show);
  };

  const handleChangeThumbnail = useCallback(
    (thumbnail: File) => {
      if (!!previewThumbnailUrl) URL.revokeObjectURL(previewThumbnailUrl);

      if (!thumbnail) return;
      const objectUrl = URL.createObjectURL(thumbnail);
      setPreviewThumbnailUrl(objectUrl);
      handleSetFieldValue("thumbnailFile", thumbnail);
    },
    [previewThumbnailUrl, handleSetFieldValue]
  );

  return (
    <Flex flexDir="column" alignItems="flex-start" gap="1rem" pt="1rem">
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Hiển thị trong cửa hàng
        </FormLabel>
        <Switch
          id="email-alerts"
          isChecked={values.showInStore}
          onChange={(ev) => handleChangeShowInStore(ev.target.checked)}
        />
      </FormControl>

      {/* TÊN */}
      <FormControl>
        <FormLabel>TÊN KHOÁ HỌC</FormLabel>
        <Input
          type="text"
          placeholder="Nhập tên khoá học"
          value={values.name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
      </FormControl>
      {/* GIÁO VIÊN */}
      <FormControl>
        <FormLabel>GIÁO VIÊN</FormLabel>
        <Input
          type="text"
          placeholder="Nhập tên giáo viên"
          value={values.teacherName}
          onChange={(e) => handleChangeTeacherName(e.target.value)}
        />
      </FormControl>
      {/* MÔ TẢ */}
      <FormControl>
        <FormLabel>MÔ TẢ</FormLabel>
        <Textarea
          placeholder="Nhập mô tả"
          value={values.description}
          onChange={(e) => handleChangeDescription(e.target.value)}
        />
      </FormControl>
      {/* GIÁ */}
      <FormControl>
        <FormLabel>
          <Flex alignItems="center" gap="1rem">
            <Text as="span">GIÁ</Text>
            {!!values.price && (
              <Text as="span" fontWeight="600">
                {displayPrice(values.price)}
              </Text>
            )}
          </Flex>
        </FormLabel>
        <Input
          type="number"
          placeholder="Nhập giá khoá học"
          value={values.price ?? ""}
          onChange={(e) => {
            handleChangePrice(
              !!e.target.valueAsNumber ? e.target.valueAsNumber : 0
            );
          }}
        />
      </FormControl>
      {/* GIÁ THAM CHIẾU */}
      <FormControl>
        <FormLabel>
          <Flex alignItems="center" gap="1rem">
            <Text as="span">GIÁ THAM CHIẾU</Text>
            {!!values.previousPrice && (
              <Text as="span" fontWeight="600">
                {displayPrice(values.previousPrice)}
              </Text>
            )}
          </Flex>
        </FormLabel>
        <Input
          type="number"
          placeholder="Nhập giá tham chiếu"
          value={values.previousPrice ?? 0}
          onChange={(e) => {
            handleChangePreviousPrice(
              !!e.target.valueAsNumber ? e.target.valueAsNumber : 0
            );
          }}
        />
      </FormControl>
      {/* THUMBNAIL */}
      <FormControl>
        <FormLabel>
          <Flex gap="1rem" alignItems="flex-end">
            <Text>THUMBNAIL</Text>
            <Text fontSize="0.875rem">
              (Khung chữ nhật nằm ngang, 16/9, 16/10)
            </Text>
          </Flex>
        </FormLabel>
        <Flex flexDir="column" alignItems="flex-start" gap="0.5rem">
          <FileInput
            name="Chọn hình"
            accept="image/*"
            onFileSelected={handleChangeThumbnail}
          />
          {!!(
            values[ICourseFormFields.thumbnailUrl] ?? previewThumbnailUrl
          ) && (
            <DisplayImage
              imageUrl={
                values[ICourseFormFields.thumbnailUrl] ?? previewThumbnailUrl
              }
              alt="thumbnail"
              w="20rem"
              aspectRatio="16/9"
            />
          )}
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default Listing;
