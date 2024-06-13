import { COLORS } from "@/constants/theme/colors";
import ImagePreviewModal from "@/views/Manage/Page/ImagePreviewModal";
import {
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FC, useCallback, useState } from "react";
import { MdClose, MdVisibility } from "react-icons/md";

type FileImageInputProps = {
  name?: string;
  imageName?: string;
  imageUrl?: string;
  placeholder: string;
  accept?: string;
  onChange: (file?: File, imageName?: string) => void;
};
const FileImageInput: FC<FileImageInputProps> = ({
  name,
  imageName,
  imageUrl,
  placeholder,
  accept,
  onChange,
}) => {
  const {
    isOpen: isPreviewModalOpen,
    onOpen: openPreviewModal,
    onClose: closePreviewModal,
  } = useDisclosure();
  const inputRef = React.useRef<any>(null);

  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    if (imageName && imageUrl) {
      setFileName(imageName);
    }
  }, [imageName, imageUrl]);

  const handleFileChange = useCallback(
    (file: File) => {
      setFile(file);
      if (!!previewUrl) URL.revokeObjectURL(previewUrl);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onChange(file, file.name);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange, previewUrl]
  );

  const onClear = () => {
    inputRef.current.value = "";
    setFile(undefined);
    setFileName("");
    setPreviewUrl("");
    onChange(undefined);
  };

  return (
    <>
      <ImagePreviewModal
        previewUrl={file ? previewUrl : imageUrl ?? ""}
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
      />
      <InputGroup>
        <FormLabel
          htmlFor={name}
          sx={{
            border: `1px solid ${COLORS.blueLapis}`,
            backgroundColor: "white",
            ":hover": {
              borderColor: "#92B3E0",
              backgroundColor: "#BBD2ED",
            },
            padding: "6px 12px",
            borderRadius: "md",
            display: "inline-block",
            cursor: "pointer",
            width: "100%",
            height: "40px",
            alignContent: "center",
            margin: 0,
            overflow: "hidden",
            '& [role="presentation"]': {
              display: "none",
            },
          }}
        >
          <FileName
            fileName={file ? file.name : fileName ?? ""}
            placeholder={placeholder}
          />
        </FormLabel>
        <Input
          ref={inputRef}
          id={name}
          name={name}
          placeholder="Tải hình ảnh"
          accept={accept}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            handleFileChange(file);
            event.target.files = null;
          }}
          type="file"
          sx={{
            '&[type="file"]': {
              display: "none",
            },
          }}
        />
        {(imageUrl || file) && (
          <InputRightElement
            top="1px"
            right="-7px"
            w={file ? "80px" : "40px"}
            bg="white"
            height="38px"
            borderRadius="0 6px 6px 0"
          >
            {file && (
              <Button
                size="sm"
                onClick={onClear}
                border={0}
                borderRadius={6}
                bg="white"
                height="38px"
              >
                <MdClose size="18px" color={"#355496"} />
              </Button>
            )}
            {(previewUrl || imageUrl) && (
              <Button
                size="sm"
                onClick={openPreviewModal}
                border={0}
                borderRadius={6}
                bg="white"
                height="38px"
              >
                <MdVisibility size="18px" color={"#355496"} />
              </Button>
            )}
          </InputRightElement>
        )}
      </InputGroup>
    </>
  );
};

export default FileImageInput;

type FileNameProps = {
  fileName: string;
  placeholder: string;
};
const FileName: FC<FileNameProps> = ({ fileName, placeholder }) => {
  return (
    <>
      {fileName ? (
        <Text fontSize="md" color="#334076" height="100%" overflow="hidden">
          {fileName}
        </Text>
      ) : (
        <Text fontSize=".875rem" color="gray.500">
          {placeholder}
        </Text>
      )}
    </>
  );
};
