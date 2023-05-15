import { Flex, Text } from "@chakra-ui/react";
import RoleTag from "@/components/Role/RoleTag";
import { UserRole } from "@/types/permission";
import { useCurrentUserSelector } from "@/store/slices/user";

const TeacherHome = () => {
  const currentUser = useCurrentUserSelector();
  return (
    <Flex>
      <Flex
        w="100%"
        alignItems="center"
        gap="0.5rem"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text fontSize="0.875rem">Xin chào,</Text>
        <RoleTag role={UserRole.teacher} />
        <Text fontSize="0.875rem" fontWeight="500">
          {currentUser?.displayName ?? currentUser?.email}!
        </Text>
      </Flex>
    </Flex>
  );
};

export default TeacherHome;
