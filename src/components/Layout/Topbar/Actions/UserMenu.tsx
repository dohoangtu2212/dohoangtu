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
import { VscSignOut } from "react-icons/vsc";

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
    <Popover>
      <PopoverTrigger>
        <Button variant="unstyled">
          <Avatar name={userCred} size="sm" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        w="fit-content"
        as={Flex}
        flexDir="column"
        alignItems="flex-end"
      >
        <PopoverArrow />
        <PopoverBody>
          <Button
            variant="ghost"
            leftIcon={<VscSignOut size="1.25rem" />}
            onClick={handleLogout}
          >
            Thoát
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
