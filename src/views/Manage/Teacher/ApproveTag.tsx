import { Tag } from "@chakra-ui/react";
import type { FC } from "react";
import type { TagProps } from "@chakra-ui/react";
import { EApproveStatus } from "@/types/registerTeacher";

type ApproveTagProps = TagProps & {
  status: EApproveStatus;
};
const ApproveTag: FC<ApproveTagProps> = ({ status, ...tagProps }) => {
  return (
    <Tag
      {...tagProps}
      fontWeight="500"
      variant="subtle"
      colorScheme={COLOR_SCHEME[status]}
    >
      {TEXT[status]}
    </Tag>
  );
};

const TEXT = {
  [EApproveStatus.Register]: "Đã đăng ký",
  [EApproveStatus.UnSeen]: "Chưa xem",
  [EApproveStatus.Seen]: "Đã xem",
};

const COLOR_SCHEME = {
  [EApproveStatus.Register]: "green",
  [EApproveStatus.UnSeen]: "gray",
  [EApproveStatus.Seen]: "BlackAlpha",
};

export default ApproveTag;
