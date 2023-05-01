import { Flex, Button, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { formikGetErrorMessages } from "@/utils/formik";
import { formikGetIsDisabled } from "@/utils/formik";
import FileInput from "@/components/Input/FileInput";
import { useUploadVideoMutation } from "@/store/apis/dyntubeUpload";
import Video from "@/components/DynTube/Video";

const CoursesCreate = () => {
  const [uploadFile] = useUploadVideoMutation();
  const formik = useFormik<{ video: File | null }>({
    initialValues: {
      video: null,
    },
    onSubmit: async (values) => {
      const res = await uploadFile({ video: values.video as File });
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = formik;

  const formErrorMessages = useMemo(
    () => formikGetErrorMessages(errors, touched),
    [errors, touched]
  );
  const formErrorMessage = formErrorMessages[0] ?? "";
  const isDisabled = useMemo(
    () => formikGetIsDisabled(errors, touched),
    [errors, touched]
  );

  const handleFileSelected = (file: File) => {
    setFieldValue("video", file);
  };

  return (
    <Flex>
      <form onSubmit={handleSubmit}>
        <FileInput
          name="Thêm video"
          accept="video/*"
          onFileSelected={handleFileSelected}
        />
        <Button type="submit">Lưu</Button>
      </form>
      <Video dynTubeKey="mwE2hVj6t0CCeakG9EL1bQ" />
    </Flex>
  );
};

export default CoursesCreate;
