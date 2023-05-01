import { Button, Input } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import type { ChangeEventHandler } from "react";
import { useCallback, useRef, forwardRef } from "react";
import { MdAdd } from "react-icons/md";

type AddFileButtonProps = {
  name: string;
  accept: InputProps["accept"];
  onFileSelected: (file: File) => void;
};

const FileInput = forwardRef<HTMLButtonElement, AddFileButtonProps>(
  ({ name, accept, onFileSelected }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleAddFile = useCallback(() => {
      if (!inputFileRef.current) return;
      inputFileRef.current.click();
    }, [inputFileRef]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      onFileSelected(file);
      e.target.files = null;
    };

    return (
      <>
        <Button
          ref={ref}
          variant="text"
          h="fit-content"
          leftIcon={<MdAdd size="1.25rem" />}
          px="0"
          onClick={handleAddFile}
        >
          {name}
        </Button>
        <Input
          type="file"
          hidden
          value=""
          ref={inputFileRef}
          onChange={handleChange}
          accept={accept}
        />
      </>
    );
  }
);
FileInput.displayName = "FileInput";

export default FileInput;
