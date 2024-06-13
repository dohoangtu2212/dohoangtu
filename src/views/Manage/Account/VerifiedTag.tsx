import { Tag } from "@chakra-ui/react";
import type { FC } from "react";
import type { TagProps } from "@chakra-ui/react";

type VerifiedTagProps = TagProps & {
  status: boolean;
};
const VerifiedTag: FC<VerifiedTagProps> = ({ status, ...tagProps }) => {
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
  ["true"]: "Đã xác minh",
  ["false"]: "Chưa xác minh",
};

const COLOR_SCHEME = {
  ["true"]: "blue",
  ["false"]: "blackAlpha",
};

export default VerifiedTag;
