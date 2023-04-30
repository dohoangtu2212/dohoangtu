import { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ROUTE, PUBLIC_ROUTES } from "@/constants/route";
import { AuthMode } from "@/constants/auth";
import { BsBoxArrowInRight } from "react-icons/bs";
import UserMenu from "@/components/Layout/Topbar/Actions/UserMenu";
import useMobile from "@/hooks/useMobile";

type ActionsProps = {
  authenticated: boolean;
};
const Actions: FC<ActionsProps> = ({ authenticated }) => {
  const isMobile = useMobile();
  const router = useRouter();
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

  const handleEnterApp = () => {
    router.push(ROUTE.app);
  };

  const handleGoToHome = () => {
    router.push(ROUTE.home);
  };

  const isAuthenticatedAndOnPublicPages =
    authenticated && PUBLIC_ROUTES.includes(pathname);
  const isUnauthenticatedAndNotOnAuthPage =
    !authenticated && pathname !== ROUTE.auth;

  if (isUnauthenticatedAndNotOnAuthPage) {
    return (
      <Flex gap="1rem">
        <Button onClick={handleSignIn}>Đăng nhập</Button>
        <Button variant="outline" onClick={handleSignUp}>
          Đăng ký
        </Button>
      </Flex>
    );
  }

  if (isAuthenticatedAndOnPublicPages) {
    return (
      <Flex gap="1rem">
        <Button
          onClick={handleEnterApp}
          leftIcon={<BsBoxArrowInRight size="1.25rem" />}
        >
          Vào ứng dụng
        </Button>
      </Flex>
    );
  }

  if (authenticated) return <UserMenu />;

  if (isMobile) return <Button onClick={handleGoToHome}>Trang chủ</Button>;

  return null;
};

export default Actions;
