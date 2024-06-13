import { Tag } from "@chakra-ui/react";
import type { FC } from "react";
import type { TagProps } from "@chakra-ui/react";

type DisableTagProps = TagProps & {
  status: boolean;
};
const DisableTag: FC<DisableTagProps> = ({ status, ...tagProps }) => {
  return (
    <Tag
      {...tagProps}
      fontWeight="500"
      variant="subtle"
      colorScheme={COLOR_SCHEME[`${status}`]}
    >
      {TEXT[`${status}`]}
    </Tag>
  );
};

const TEXT = {
  ["true"]: "Vô hiệu hoá",
  ["false"]: "Hoạt động",
};

const COLOR_SCHEME = {
  ["true"]: "blackAlpha",
  ["false"]: "green",
};

export default DisableTag;
