import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SlPaperPlane, SlLock, SlTag, SlPeople } from "react-icons/sl";
import useMobile from "@/hooks/useMobile";

const IMAGE_ADDRESS =
  "https://mrstranganh.edu.vn/upload/banner/1680571629-z4235885897159_88a33ee5ca64651c34f68e0b2fe14977.jpg";

const GOOD_THINGS = [
  {
    id: "1",
    name: "Hỗ trợ vận chuyển",
    description: "Vận chuyển nhanh chóng",
    Icon: SlPaperPlane,
  },
  {
    id: "2",
    name: "Thanh toán bảo mật",
    description: "An toàn, tin cậy, chính xác",
    Icon: SlLock,
  },
  {
    id: "3",
    name: "Giá bán cạnh trang",
    description: "Giá tốt, hợp lý, chất lượng",
    Icon: SlTag,
  },
  {
    id: "4",
    name: "Tư vấn nhiệt tình",
    description: "Thân thiện và chuyên nghiệp",
    Icon: SlPeople,
  },
];

const Hero = () => {
  const { isMobile } = useMobile();
  return (
    <Flex flexDir="column">
      <Box
        w="100%"
        height={{ base: "15rem", md: "40rem" }}
        borderRadius="6px"
        position="relative"
        zIndex="0"
      >
        <Image
          loader={() => IMAGE_ADDRESS}
          src={IMAGE_ADDRESS}
          alt="Hero"
          fill
        />
      </Box>
      <Flex
        px={{ base: "1rem", md: "8rem" }}
        bgColor="gray.200"
        flexDir={{ base: "column", md: "row" }}
      >
        {GOOD_THINGS.map((thing) => (
          <Flex
            key={thing.id}
            p={{ base: "0.75rem", md: "2rem" }}
            alignItems="center"
            gap="1rem"
            flex="1"
          >
            <thing.Icon size="2rem" />
            <Box>
              <Text fontWeight="700" textTransform="uppercase">
                {thing.name}
              </Text>
              <Text>{thing.description}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Hero;
