import { FC } from "react";
import { Flex, Button, IconButton, Tooltip, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { AuthMode } from "@/constants/auth";
import UserMenu from "@/components/Layout/Topbar/Actions/UserMenu";
import useMobile from "@/hooks/useMobile";
import { useCurrentUserSelector } from "@/store/slices/user";
import { MdHome } from "react-icons/md";
import { COLORS } from "@/constants/theme";

type ActionsProps = {};
const Actions: FC<ActionsProps> = () => {
  const { isMobile } = useMobile();
  const router = useRouter();
  const currentUser = useCurrentUserSelector();
  const authenticated = !!currentUser;
  const { pathname } = router;

  const handleSignIn = () => {
    router.push({
      pathname: ROUTE.auth,
      query: {
        mode: AuthMode.signIn,
      },
    });
  };

  const handleSignUp = () => {
    router.push({
      pathname: ROUTE.auth,
      query: {
        mode: AuthMode.signUp,
      },
    });
  };

  const handleGoToHome = () => {
    router.push(ROUTE.home);
  };

  const isUnauthenticatedAndNotOnAuthPage =
    !authenticated && pathname !== ROUTE.auth;

  if (isUnauthenticatedAndNotOnAuthPage) {
    return (
      <Flex gap="0.5rem" p="0.125rem" borderRadius="md">
        <Button
          variant="ghost"
          color={COLORS.whiteSatin}
          onClick={handleSignUp}
          fontSize="0.875rem"
          h="fit-content"
          py="0.5rem"
        >
          Đăng kí
        </Button>
        <Button
          onClick={handleSignIn}
          fontSize="0.875rem"
          h="fit-content"
          py="0.5rem"
          variant="outline"
          color={COLORS.whiteSatin}
          borderColor={COLORS.whiteSatin}
        >
          Đăng nhập
        </Button>
      </Flex>
    );
  }

  if (authenticated) return <UserMenu />;

  if (isMobile)
    return (
      <Tooltip
        hasArrow
        borderRadius="md"
        placement="left"
        label={
          <Box>
            <Text>Trang chủ</Text>
          </Box>
        }
      >
        <IconButton
          onClick={handleGoToHome}
          color={COLORS.whiteSatin}
          px="0"
          aria-label="Home"
          variant="ghost"
          icon={<MdHome size="1.75rem" />}
        />
      </Tooltip>
    );

  return null;
};

export default Actions;
