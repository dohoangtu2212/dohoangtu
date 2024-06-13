import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

import React, { FC, useState } from "react";
import IntroductionForm from "./IntroductionForm";
import {
  useCurrentUserSelector,
  useUserRoleSelector,
} from "@/store/slices/user";
import CommitForm from "./CommitForm";
import LessonForm from "./LessonForm";
import ReviewForm from "./ReviewForm";
import { UserRole } from "@/types/permission";
import { useGetManagePageQuery } from "@/store/apis/db";
import { COLORS } from "@/constants/theme/colors";

type TabItemProps = {
  name: string;
  active?: boolean;
  onClick?: () => void;
};

const TabItem: FC<TabItemProps> = ({ name, active = false, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        margin: 0,
        border: "none",
        padding: "0 24px",
        float: "left",
        position: "relative",
        display: "block",
        textDecoration: "none",
        fontWeight: 500,
        fontSize: "14px",
        textTransform: "uppercase",
        overflow: "hidden",
        width: "100%",
        height: "35px",
        lineHeight: "35px",
        boxSizing: "border-box",
        letterSpacing: "2px",
        textAlign: "left",
        color: active ? "#355496" : "rgba(0, 0, 0, .54)",
        borderRight: active ? "3px solid #355496" : "none",
        cursor: "pointer",
      }}
    >
      <Text>{name}</Text>
    </Box>
  );
};

const ManagePage = () => {
  const [tab, setTab] = useState<number>(0);
  const currentUser = useCurrentUserSelector();
  const userRole = useUserRoleSelector();
  const {
    data: managePage = null,
    isLoading: isGetManagePageLoading,
    isFetching: isGetManagePageFetching,
  } = useGetManagePageQuery(null, {
    skip: !currentUser?.uid || userRole !== UserRole.admin,
  });

  const tabList = [
    { name: "Giới thiệu", index: 0 },
    { name: "Cam kết", index: 1 },
    { name: "Bài giảng", index: 2 },
    { name: "Đánh giá", index: 3 },
  ];

  const isLoading = isGetManagePageLoading || isGetManagePageFetching;

  return (
    <>
      <Flex flexDir="column" gap="1rem">
        <Flex flexDir="row">
          <Text fontWeight="600" textTransform="uppercase">
            Quản lý trang chủ
          </Text>
        </Flex>
        {isLoading ? (
          <Spinner color={COLORS.twilightBlue} />
        ) : (
          <Flex flexDir="column" w="100%" h="100%">
            <Flex flexDir="row">
              <Box width="200px">
                <Flex
                  flexDir={"column"}
                  pb="35px"
                  borderRight="1px solid rgba(10, 11, 49, 0.20)"
                >
                  {tabList.map((item, index) => (
                    <TabItem
                      key={index}
                      name={item.name}
                      active={tab === item.index}
                      onClick={() => setTab(item.index)}
                    />
                  ))}
                </Flex>
              </Box>
              <Flex width="100%" pl="30px">
                {tab == 0 && <IntroductionForm data={managePage} />}
                {tab == 1 && <CommitForm data={managePage} />}
                {tab == 2 && <LessonForm data={managePage} />}
                {tab == 3 && <ReviewForm data={managePage} />}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ManagePage;

const NotFoundState = () => {
  return <Text textAlign="center"></Text>;
};
