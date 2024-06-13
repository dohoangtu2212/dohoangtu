import { IBaseUser } from "@/types/user";
import { Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

type ChangePasswordProps = {
  user: IBaseUser;
};

const ChangePassword: FC<ChangePasswordProps> = ({ user }) => {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        pr={6}
        pl={12}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{
            base: "2xl",
            sm: "3xl",
            fontSize: "0.875rem",
          }}
        >
          Đổi mật khẩu
        </Heading>
        <Flex flexDir="row" gap={"24px"} pr="100px">
          <ChangePasswordForm />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default ChangePassword;
