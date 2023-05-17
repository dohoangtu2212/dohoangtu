import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import useMobile from "@/hooks/useMobile";

const Hero = () => {
  const { isMobile } = useMobile();
  return (
    <Flex
      gap="2rem"
      flexDir={{ base: "column-reverse", md: "row" }}
      alignItems={{ base: "center", md: "flex-start" }}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        w={{ base: "fit-content", md: "25rem" }}
        h={{ base: "25rem", md: "35rem" }}
        overflow="hidden"
        borderRadius="lg"
      >
        <Image
          src="/images/tu-2.jpeg"
          alt="Hero"
          width={isMobile ? 300 : 400}
          height={800}
        />
      </Flex>

      <Flex flexDir="column" gap="1rem">
        <Text
          textTransform="uppercase"
          fontSize={{ base: "1.25rem", md: "1.75rem" }}
          textAlign="center"
          fontWeight="700"
        >
          lớp học trực tuyến {isMobile && <br />} video-on-demand
        </Text>
        <Flex
          alignItems="center"
          gap={{ base: "0", md: "1rem" }}
          flexDir={{ base: "column", md: "row" }}
        >
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
