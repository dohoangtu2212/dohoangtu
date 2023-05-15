import { Flex, Text, Box, Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";

type SectionTitleProps = InputProps & {
  sectionOrder: string;
};
const SectionTitle: FC<SectionTitleProps> = ({
  sectionOrder,
  ...inputProps
}) => {
  return (
    <Flex alignItems="center" gap="0.5rem" fontWeight="600" w="100%">
      <Box>
        <Text w="max-content">CHƯƠNG {sectionOrder}:</Text>
      </Box>
      <Input type="text" {...inputProps} variant="flushed" />
    </Flex>
  );
};

export default SectionTitle;
