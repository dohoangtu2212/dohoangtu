import { Flex } from "@chakra-ui/react";
import AuthForm, { DisplayMode } from "@/views/Auth/AuthForm";

const Auth = () => {
  return (
    <Flex flexDir="column" w="100vw" h="100vh">
      <Flex alignItems="center" justifyContent="center" flex="1">
        <AuthForm mode={DisplayMode.page} />
      </Flex>
    </Flex>
  );
};

export default Auth;
