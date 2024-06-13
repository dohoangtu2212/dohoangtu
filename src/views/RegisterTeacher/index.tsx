import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import RegisterTeacherForm from "./RegisterTeacherForm";

const RegisterTeacher = () => {
  return (
    <Flex flexDir="column" gap="1rem">
      <Flex flexDir="row">
        <Text fontWeight="600" textTransform="uppercase">
          Đăng ký để tham gia đào tạo
        </Text>
      </Flex>
      <Flex flexDir="row" pt="24px">
        <Box w="500px" mt="100px">
          <Image src="/images/register-teacher.jpg" alt="" w="400px" />
        </Box>
        <Box w="full" pt="24px">
          <Flex align={"center"} justify={"center"}>
            <Stack
              spacing={4}
              w={"full"}
              bg={"white"}
              rounded={"xl"}
              pr={6}
              pl={12}
            >
              <Flex flexDir="row" gap={"24px"} pr="100px">
                <RegisterTeacherForm />
              </Flex>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RegisterTeacher;
