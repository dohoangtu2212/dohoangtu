import NavItem from "@/components/Layout/Navigation/NavItem";
import {
  PERMISSION_NAVIGATORS,
  PUBLIC_NAVIGATORS,
} from "@/constants/navigator";
import { useRouter } from "next/router";
import NavigatorsContainer from "@/components/Layout/Navigation/NavigatorsContainer";
import type { FC } from "react";
import { ROUTE } from "@/constants/route";
import useMobile from "@/hooks/useMobile";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useUserPermissionSelector } from "@/store/slices/user";
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
  const userPermission = useUserPermissionSelector();

  const { pathname } = router;

  const navigators = useMemo(() => {
    return [
      ...PUBLIC_NAVIGATORS,
      ...PERMISSION_NAVIGATORS.filter((nav) =>
        userPermission?.routes.includes(nav.link)
      ),
    ];
  }, [userPermission?.routes]);

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
