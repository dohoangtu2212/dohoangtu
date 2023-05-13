import {
  Flex,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { MdClose, MdCheck, MdEdit } from "react-icons/md";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="cancel"
        icon={<MdClose />}
        {...getCancelButtonProps()}
      />
      <IconButton
        aria-label="enter"
        icon={<MdCheck />}
        {...getSubmitButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="edit"
        size="sm"
        icon={<MdEdit />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

export default EditableControls;
