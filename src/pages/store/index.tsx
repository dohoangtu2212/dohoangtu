import Head from "next/head";
import PageContainer from "@/components/Layout/PageContainer";
import Courses from "@/views/Courses";
import { Flex, Text } from "@chakra-ui/react";
import RoleTag from "@/components/Role/RoleTag";
import { UserRole } from "@/types/permission";
import { useUserRoleSelector } from "@/store/slices/user";

const StorePage = () => {
  const userRole = useUserRoleSelector();
  return (
    <>
      <Head>
        <title>Cửa hàng</title>
      </Head>
      <PageContainer>
        {userRole !== UserRole.student && (
          <Flex
            alignItems="center"
            gap="0.5rem"
            p="0.5rem 1rem"
            mb="1rem"
            borderRadius="lg"
            bgColor="orange.200"
          >
            <Text>Giỏ hàng chỉ được áp dụng cho tài khoản</Text>
            <RoleTag role={UserRole.student} />
          </Flex>
        )}
        <Courses />
      </PageContainer>
    </>
  );
};

export default StorePage;
