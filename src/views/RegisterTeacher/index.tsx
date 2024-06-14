import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import RegisterTeacherForm from "./RegisterTeacherForm";

const RegisterTeacher = () => {
  return (
    <Flex flexDir="column" gap="1rem" py="1rem">
      <Flex flexDir="column" gap="1rem">
        <Flex flexDir="row" justifyContent={{ base: "center", md: "left" }}>
          <Text fontWeight="600" textTransform="uppercase">
            Đăng ký để tham gia đào tạo
          </Text>
        </Flex>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          pt={{ base: "0", md: "1.5rem" }}
        >
          <Flex
            w={{ base: "100%", md: "500px" }}
            mt={{ base: "0" }}
            justifyContent="center"
          >
            <Image
              src="/images/register-teacher.jpg"
              alt=""
              w={{ base: "60vw", md: "400px" }}
              objectFit="contain"
            />
          </Flex>
          <Box
            w="full"
            pt={{ base: "0", md: "1.5rem" }}
            px={{ base: "8px", md: "0" }}
          >
            <Flex align={"center"} justify={"center"}>
              <Stack
                spacing={4}
                w={"full"}
                bg={"white"}
                rounded={"xl"}
                pr={{ base: "0", md: "1.5rem" }}
                pl={{ base: "0", md: "3rem" }}
              >
                <Flex
                  flexDir="row"
                  gap={"1.5rem"}
                  pr={{ base: "0", md: "100px" }}
                >
                  <RegisterTeacherForm />
                </Flex>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegisterTeacher;
