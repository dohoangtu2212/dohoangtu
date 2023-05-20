import { Flex, Box, Text } from "@chakra-ui/react";

const DEMO_VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FDemo1.mp4?alt=media&token=83867c46-3507-4416-8391-1c1240fdaa1d";

const VALUES = [
  {
    title: "Bài giảng từ cơ bản đến nâng cao 9+",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl: DEMO_VIDEO_URL,
  },
  {
    title: "Lí thuyết được minh hoạ bằng hình động",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl: DEMO_VIDEO_URL,
  },
  {
    title: "Bài tập được giải cụ thể, chi tiết",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl: DEMO_VIDEO_URL,
  },
  {
    title: "Hỗ trợ, hướng dẫn 24/7 mọi thắc mắc",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl: DEMO_VIDEO_URL,
  },
];

const Values = () => {
  return (
    <Flex flexDir="column" alignItems="center" gap="2rem">
      {VALUES.map((value, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <Flex
            key={value.title}
            flexDir={{
              base: "column-reverse",
              md: isEven ? "row" : "row-reverse",
            }}
            w={{ base: "100%", md: "80%" }}
            gap={{ base: "1rem", md: "4rem" }}
            alignItems="center"
          >
            <Box borderRadius="lg" overflow="hidden" flex="1">
              <video autoPlay muted loop>
                <source src={DEMO_VIDEO_URL} type="video/mp4" />
              </video>
            </Box>
            <Flex flex="1" flexDir="column" px={{ base: "1rem", md: "0" }}>
              <Text
                fontSize={{ base: "1.25rem", md: "1.5rem" }}
                fontWeight="700"
              >
                {value.title}
              </Text>
              <Text fontSize={{ base: "0.875rem", md: "1rem" }}>
                {value.description}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Values;
