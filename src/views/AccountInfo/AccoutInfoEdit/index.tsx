import { IBaseUser } from "@/types/user";
import { Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import AccountInfoForm from "./AccountInfoForm";
import { AccountInfoFormValues } from "@/types/auth";
import { UserRole } from "@/types/permission";
import {
  baseInfoFormValidationSchema,
  studentInfoFormValidationSchema,
  teacherInfoFormValidationSchema,
} from "@/constants/auth";

type AccoutInfoEditProps = {
  user: IBaseUser;
  onSubmit: (values: AccountInfoFormValues, birthday?: Date) => Promise<void>;
};

const AccoutInfoEdit: FC<AccoutInfoEditProps> = ({ user, onSubmit }) => {
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
          Thông tin cá nhân
        </Heading>
        <Flex flexDir="row" gap={"24px"} pr="100px">
          <AccountInfoForm
            user={user}
            onSubmit={onSubmit}
            validationSchema={() => {
              if (user.role === UserRole.student) {
                return studentInfoFormValidationSchema;
              }
              if (user.role === UserRole.teacher) {
                return teacherInfoFormValidationSchema;
              } else {
                return baseInfoFormValidationSchema;
              }
            }}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default AccoutInfoEdit;
