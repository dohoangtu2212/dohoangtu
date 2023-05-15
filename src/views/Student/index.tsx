import { useCurrentUserSelector } from "@/store/slices/user";
import { Flex, Text, Divider } from "@chakra-ui/react";
import RoleTag from "@/components/Role/RoleTag";
import { UserRole } from "@/types/permission";

const StudentHome = () => {
  const currentUser = useCurrentUserSelector();
  return (
    <Flex flexDir="column" gap="1.5rem">
      <Flex
        alignItems="center"
        gap="0.5rem"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text fontSize="0.875rem">Xin chào,</Text>
        <RoleTag role={UserRole.student} />
        <Text fontSize="0.875rem" fontWeight="500">
          {currentUser?.displayName ?? currentUser?.email}!
        </Text>
      </Flex>
      <Flex flexDir="column">
        <Text fontWeight="600" textTransform="uppercase">
          Tiến độ học tập
        </Text>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default StudentHome;
