import NavItem from "@/components/Layout/Navigation/NavItem";
import {
  PUBLIC_NAVIGATORS,
  STUDENT_NAVIGATORS,
  TEACHER_NAVIGATORS,
} from "@/constants/navigator";
import { useRouter } from "next/router";
import NavigatorsContainer from "@/components/Layout/Navigation/NavigatorsContainer";
import type { FC } from "react";
import { PUBLIC_ROUTES } from "@/constants/route";
import useMobile from "@/hooks/useMobile";
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Flex,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";

type NavigatorsProps = {};
const Navigators: FC<NavigatorsProps> = () => {
  const { isMobile } = useMobile();

  if (isMobile)
    return (
      <NavigatorsContainer>
        <NavigatorsList />
      </NavigatorsContainer>
    );

  return (
    <Popover placement="right-end">
      <PopoverTrigger>
        <IconButton
          aria-label="navigators"
          variant="ghost"
          icon={<AiOutlineMenu size="1.5rem" />}
        />
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />
        <PopoverBody>
          <Flex alignItems="center">
            <NavigatorsList />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const NavigatorsList = () => {
  const userRole = useUserRoleSelector();
  const router = useRouter();
  const { pathname } = router;

  const showPublicNavigators = PUBLIC_ROUTES.includes(pathname);
  const isRoleStudent = userRole === UserRole.student;
  const isRoleTeacher = userRole === UserRole.teacher;

  const navigators = useMemo(() => {
    if (showPublicNavigators) return PUBLIC_NAVIGATORS;
    if (isRoleStudent) return STUDENT_NAVIGATORS;
    if (isRoleTeacher) return TEACHER_NAVIGATORS;
    return [];
  }, [isRoleStudent, showPublicNavigators, isRoleTeacher]);
  return (
    <>
      {navigators.map((nav) => {
        const isActive = pathname === nav.link;
        return (
          <NavItem
            key={nav.id}
            onClick={() => router.push(nav.link)}
            color={isActive ? "orange.400" : "base"}
          >
            {nav.name}
          </NavItem>
        );
      })}
    </>
  );
};

export default Navigators;
