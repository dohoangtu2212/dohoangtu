import { Box, type InputProps } from "@chakra-ui/react";
import type { FC } from "react";
import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { COLORS } from "@/constants/theme/colors";

type AutoCompleteSelectProps = InputProps & {
  value: string;
  onChangeValue: (value: string) => void;
  options: string[];
  placeholder?: string;
};
const AutoCompleteSelect: FC<AutoCompleteSelectProps> = ({
  value,
  onChangeValue,
  options,
  placeholder,
  ...inputProps
}) => {
  return (
    <Box
      sx={{
        "& input": {
          border: `1px solid ${COLORS.blueLapis}`,
          backgroundColor: "white",
          ":hover": {
            borderColor: "#92B3E0",
            backgroundColor: "#BBD2ED",
          },
        },
      }}
    >
      <AutoComplete
        freeSolo
        openOnFocus
        suggestWhenEmpty
        listAllValuesOnFocus
        creatable
        onChange={(_value) => {
          onChangeValue(_value);
        }}
      >
        <AutoCompleteInput
          variant="filled"
          placeholder={placeholder}
          {...inputProps}
        />
        <AutoCompleteList>
          <Box
            sx={{
              "& > div": {
                position: "relative",
                paddingLeft: "42px",
                color: "blue.500",
                fontWeight: "700",
                textTransform: "capitalize",
                "&::after": {
                  content: '"Add"',
                  position: "absolute",
                  top: "50%",
                  left: "8px",
                  transform: "translateY(-50%)",
                  color: "#334076",
                  fontWeight: "400",
                },
              },
            }}
          >
            <AutoCompleteCreatable />
          </Box>
          {options.map((option, index) => (
            <AutoCompleteItem
              key={`option-${index}`}
              value={option}
              textTransform="capitalize"
            >
              {option}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Box>
  );
};

export default AutoCompleteSelect;
