import {
  Flex,
  Text,
  Editable,
  EditablePreview,
  EditableInput,
  Box,
} from "@chakra-ui/react";
import { FC } from "react";
import type { EditableProps } from "@chakra-ui/react";
import EditableControls from "@/views/Teacher/CoursesNew/Form/Structure/EditableControls";

type SectionTitleProps = EditableProps & {
  sectionOrder: string;
};
const SectionTitle: FC<SectionTitleProps> = ({
  sectionOrder,
  ...editableProps
}) => {
  return (
    <Editable
      as={Flex}
      alignItems="center"
      w="100%"
      gap="0.5rem"
      onClick={(e) => e.stopPropagation()}
      {...editableProps}
    >
      <Flex alignItems="center" gap="0.5rem" fontWeight="600" w="100%">
        <Text>CHƯƠNG {sectionOrder}:</Text>
        <Box
          bg="gray.200"
          px="0.5rem"
          minW="10rem"
          h="2rem"
          borderRadius="lg"
          overflow="hidden"
          flex="1"
        >
          <EditablePreview />
          <EditableInput />
        </Box>
      </Flex>
      <EditableControls />
    </Editable>
  );
};

export default SectionTitle;
