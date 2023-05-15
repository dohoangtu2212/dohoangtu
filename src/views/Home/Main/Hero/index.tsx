import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const Hero = () => {
  return (
    <Flex gap="2rem">
      <Box
        w="25rem"
        h="16rem"
        height={{ base: "15rem", md: "40rem" }}
        overflow="hidden"
      >
        <Image src="/images/tu-1.jpeg" alt="Hero" width={400} height={400} />
      </Box>

      <Flex flexDir="column" gap="1rem">
        <Text textTransform="uppercase" fontSize="1.75rem" fontWeight="700">
          lớp học trực tuyến video-on-demand
        </Text>
        <Flex alignItems="center" gap="1rem">
          <Text>Giáo viên</Text>
          <Text fontWeight="600" fontSize="1.5rem">
            Đỗ Hoàng Tú
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
