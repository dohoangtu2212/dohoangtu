import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  Text,
  Button,
} from "@chakra-ui/react";
import type { FC } from "react";
import SignIn from "@/views/Auth/AuthForm/SignIn";
import SignUp from "@/views/Auth/AuthForm/SignUp";
import { useRouter } from "next/router";
import { AuthMode } from "@/constants/auth";
import { FcGoogle } from "react-icons/fc";
import { BiMessageDetail } from "react-icons/bi";

export enum DisplayMode {
  page = "page",
  modal = "modal",
}

type AuthFormProps = {
  mode: DisplayMode;
};

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const authMode = router.query?.mode as AuthMode;

  const isSignUp = authMode === AuthMode.signUp;

  return (
    <Flex
      flexDir="column"
      w={{ base: "90vw", md: "30rem" }}
      minH={{ base: "50vh", md: "30rem" }}
      as={mode === DisplayMode.page ? Card : Flex}
    >
      <Tabs defaultIndex={isSignUp ? 1 : 0}>
        <TabList justifyContent="center" gap="3rem">
          <Tab>Đăng nhập</Tab>
          <Tab>Đăng ký</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex flexDir="column" gap="1rem" px="1rem">
        <Text textAlign="center" fontSize="0.75rem">
          Phương thức khác
        </Text>
        <Button leftIcon={<FcGoogle size="1.25rem" />} isDisabled>
          Đăng nhập bằng Google
        </Button>
        <Button leftIcon={<BiMessageDetail size="1.25rem" />} isDisabled>
          Đăng nhập bằng OTP
        </Button>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
