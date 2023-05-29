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
        <title>Khoá học</title>
      </Head>
      <PageContainer>
        {userRole === UserRole.teacher && (
          <Text
            p="0.5rem 1rem"
            mb="1rem"
            borderRadius="lg"
            bgColor="orange.100"
            textAlign={{ base: "center", md: "left" }}
            w={{ base: "100%", md: "fit-content" }}
          >
            Giỏ hàng chỉ được áp dụng cho tài khoản{" "}
            <RoleTag role={UserRole.student} as="span" />
          </Text>
        )}
        <Courses />
      </PageContainer>
    </>
  );
};

export default StorePage;
