import NavItem from "@/components/Layout/Navigation/NavItem";
import {
  ADMIN_NAVIGATORS,
  PUBLIC_NAVIGATORS,
  STUDENT_NAVIGATORS,
  TEACHER_NAVIGATORS,
} from "@/constants/navigator";
import { useRouter } from "next/router";
import NavigatorsContainer from "@/components/Layout/Navigation/NavigatorsContainer";
import type { FC } from "react";
import { ROUTE } from "@/constants/route";
import useMobile from "@/hooks/useMobile";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useUserRoleSelector } from "@/store/slices/user";
import { UserRole } from "@/types/permission";
import { COLORS } from "@/constants/theme/colors";

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
    <Flex alignItems="center" gap="0.5rem">
      <NavigatorsList />
    </Flex>
  );
};

type NavigatorsListProps = {};
const NavigatorsList: FC<NavigatorsListProps> = () => {
  const router = useRouter();
  const userRole = useUserRoleSelector();

  const { pathname } = router;

  const isRoleStudent = userRole === UserRole.student;
  const isRoleTeacher = userRole === UserRole.teacher;
  const isRoleAdmin = userRole === UserRole.admin;

  const navigators = useMemo(() => {
    if (isRoleStudent) return [...PUBLIC_NAVIGATORS, ...STUDENT_NAVIGATORS];
    if (isRoleTeacher) return [...PUBLIC_NAVIGATORS, ...TEACHER_NAVIGATORS];
    if (isRoleAdmin) return [...PUBLIC_NAVIGATORS, ...ADMIN_NAVIGATORS];
    return PUBLIC_NAVIGATORS;
  }, [isRoleStudent, isRoleTeacher, isRoleAdmin]);

  return (
    <>
      {navigators?.map((nav) => {
        const isActive = pathname === nav.link;
        const isHomePage = nav.link === ROUTE.home;

        return (
          <NavItem
            key={nav.id}
            onClick={() => router.push(nav.link)}
            color={isActive ? COLORS.whiteSatin : COLORS.windmillWings}
            letterSpacing="1px"
            fontWeight={isActive ? "700" : "400"}
            gap="0.5rem"
            fontSize={{
              base: isHomePage ? "1.25rem" : "1rem",
              md: isHomePage ? "1.25rem" : "0.875rem",
            }}
          >
            {!!nav.Icon && <nav.Icon size="1.5rem" />}
            <Text>{nav.name}</Text>
          </NavItem>
        );
      })}
    </>
  );
};

export default Navigators;
