import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

type DragDropProps = {
  onChange: (file: any) => void;
};

function DragDrop({ onChange }: DragDropProps) {
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
    onChange(file);
  };
  return (
    <Flex
      sx={{
        "& > label": {
          display: "block",
          width: "100%",
          cursor: "pointer",
        },
        flex: "1 1 auto",
        height: "200px",
      }}
    >
      <FileUploader
        multiple
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      >
        <Flex
          sx={{
            borderRadius: "4px",
            width: "100%",
            height: "100%",
            backgroundImage:
              "repeating-linear-gradient(0deg, #6289C6, #6289C6 7px, transparent 7px, transparent 12px, #6289C6 12px), repeating-linear-gradient(90deg, #6289C6, #6289C6 7px, transparent 7px, transparent 12px, #6289C6 12px), repeating-linear-gradient(180deg, #6289C6, #6289C6 7px, transparent 7px, transparent 12px, #6289C6 12px), repeating-linear-gradient(270deg, #6289C6, #6289C6 7px, transparent 7px, transparent 12px, #6289C6 12px)",
            backgroundSize: "2px 100%, 100% 2px, 2px 100% , 100% 2px",
            backgroundPosition: "0 0, 0 0, 100% 0, 0 100%",
            backgroundRepeat: "no-repeat",
            padding: "30px",
            display: "flex",
            flexDir: "column",
            alignItems: "center",
          }}
        >
          <Image src="/images/icon-upload.jpg" alt="" w="100px" />
          <Text fontSize="0.875rem">
            <u>Click to Upload</u> or drag and drop
          </Text>
        </Flex>
      </FileUploader>
    </Flex>
  );
}

export default DragDrop;
