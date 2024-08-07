import { UserRole } from "@/types/permission";
import { Box, Text, Tag } from "@chakra-ui/react";
import type { FC } from "react";
import type { TagProps } from "@chakra-ui/react";

type RoleTagProps = TagProps & {
  role: UserRole;
};
const RoleTag: FC<RoleTagProps> = ({ role, ...tagProps }) => {
  return (
    <Tag
      {...tagProps}
      fontWeight="500"
      variant="subtle"
      colorScheme={COLOR_SCHEME[role]}
      justifyContent="center"
    >
      {TEXT[role]}
    </Tag>
  );
};

const TEXT = {
  [UserRole.teacher]: "Giáo viên",
  [UserRole.student]: "Học sinh",
  [UserRole.admin]: "Quản trị viên",
};

const COLOR_SCHEME = {
  [UserRole.teacher]: "cyan",
  [UserRole.student]: "green",
  [UserRole.admin]: "purple",
};

export default RoleTag;
