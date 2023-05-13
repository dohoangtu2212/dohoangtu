import {
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import RoleTag from "@/components/Role/RoleTag";
import { UserRole } from "@/types/permission";
import { MdPerson, MdLogout } from "react-icons/md";

const UserMenu = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userCred = !!user
    ? user.displayName ?? user.email?.split("@")[0]
    : "N/A";

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button variant="unstyled">
          <Avatar name={userCred} size="sm" />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />
        <PopoverBody>
          <Flex flexDir="column" gap="1rem">
            <RoleTag role={UserRole.teacher} />
            <Button
              variant="ghost"
              leftIcon={<MdPerson size="1.25rem" />}
              fontSize="0.875rem"
              justifyContent="flex-start"
            >
              Thông tin
            </Button>
            <Button
              variant="ghost"
              leftIcon={<MdLogout size="1.25rem" />}
              onClick={handleLogout}
              fontSize="0.875rem"
              justifyContent="flex-start"
            >
              Thoát
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
