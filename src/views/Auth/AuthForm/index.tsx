import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
} from "@chakra-ui/react";
import { FC, useCallback } from "react";
import SignIn from "@/views/Auth/AuthForm/SignIn";
import SignUp from "@/views/Auth/AuthForm/SignUp";
import { useRouter } from "next/router";
import { AuthMode } from "@/constants/auth";
import { DisplayMode } from "@/views/Auth/AuthForm/types";
import { getAuth, getUserRole } from "@/utils/firebase";
import { UserRole } from "@/types/permission";
import { ROUTE } from "@/constants/route";
import { COLORS } from "@/constants/theme/colors";
import { useCurrentUserSelector } from "@/store/slices/user";

type AuthFormProps = {
  mode: DisplayMode;
  onLoggedIn?: () => void;
};

const AuthForm: FC<AuthFormProps> = ({ mode, onLoggedIn }) => {
  const router = useRouter();
  const authMode = router.query?.mode as AuthMode;

  const isSignUp = authMode === AuthMode.signUp;

  const handleDone = useCallback(async () => {
    onLoggedIn?.();
    const userRole = await getUserRole();
    const auth = await getAuth();
    if (mode === DisplayMode.modal) return;
    if (auth.currentUser?.emailVerified === false)
      router.push(ROUTE.accountActivation);
    else if (userRole === UserRole.student) router.push(ROUTE.studentCourses);
    else if (userRole === UserRole.teacher) router.push(ROUTE.teacherCourses);
    else if (userRole === UserRole.admin) router.push(ROUTE.adminManageAccount);
  }, [onLoggedIn, mode, router]);

  return (
    <Flex
      flexDir="column"
      w={{ base: "90vw", md: "30rem" }}
      minH="25rem"
      as={mode === DisplayMode.page ? Card : Flex}
      bgColor={COLORS.white}
      pb="2rem"
    >
      <Tabs defaultIndex={isSignUp ? 1 : 0} w="100%">
        <TabList justifyContent="center" gap="3rem">
          <Tab>Đăng nhập</Tab>
          <Tab>Đăng kí</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignIn onDone={handleDone} />
          </TabPanel>
          <TabPanel>
            <SignUp onDone={handleDone} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AuthForm;
