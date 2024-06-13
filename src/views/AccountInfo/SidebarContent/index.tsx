import { UserRole } from "@/types/permission";
import { IBaseUser } from "@/types/user";
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import AvatarUser from "./AvatarUser";

export interface LinkItemProps {
  name: string;
  code: string;
  icon: IconType;
}

interface SidebarContentProps extends BoxProps {
  user?: IBaseUser;
  linkItems: LinkItemProps[];
  value: string;
  onChangeValue: (value: string) => void;
  onClose: () => void;
}

const SidebarContent: FC<SidebarContentProps> = ({
  user,
  linkItems,
  value,
  onChangeValue,
  onClose,
  ...rest
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="300px"
      pr="16px"
      py="32px"
      {...rest}
    >
      <Flex
        flexDir="column"
        style={{
          alignItems: "center",
        }}
      >
        <AvatarUser />
        <Text fontSize="1rem" fontWeight="600" pt="10px">
          {user?.fullName ?? "Unknown"}
        </Text>
        <Text fontSize="0.875rem" fontWeight="400" pb="24px">
          {(user?.role && renderRole(user?.role)) ?? "Unknown"}
        </Text>
      </Flex>
      {linkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          active={link.code === value}
          onClick={() => onChangeValue(link.code)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  active: boolean;
}
const NavItem = ({ icon, children, active, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        px="16px"
        my="4px"
        height="40px"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize="0.875rem"
        color={active ? "blue.500" : "gray.500"}
        bg={active ? "gray.100" : ""}
        _hover={{
          bg: "gray.100",
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const renderRole = (role: UserRole) => {
  if (role == UserRole.student) {
    return "Học viên";
  } else if (role == UserRole.teacher) {
    return "Giáo viên";
  } else if (role == UserRole.admin) {
    return "Quản trị viên";
  }
  return "";
};
