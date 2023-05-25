import useMobile from "@/hooks/useMobile";
import { Flex, Box, Text } from "@chakra-ui/react";

const DEMO_VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FDemo1.mp4?alt=media&token=83867c46-3507-4416-8391-1c1240fdaa1d";

const VALUES = [
  {
    title: "Bài giảng từ cơ bản đến nâng cao 9+",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo1.mp4?alt=media&token=fc5a610e-2dde-40bd-adf1-ebf27e38103f",
  },
  {
    title: "Lí thuyết được minh hoạ bằng hình động",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo2.mp4?alt=media&token=a1119ee0-ad24-46db-9945-ee89bf10cd07",
  },
  {
    title: "Bài tập được giải cụ thể, chi tiết",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo3.mp4?alt=media&token=9bd433d5-6a41-432c-a368-473159a9c4c1",
  },
  {
    title: "Hỗ trợ, hướng dẫn 24/7 mọi thắc mắc",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo4.mp4?alt=media&token=452f4efb-f421-4d5e-a415-3545c408b37d",
  },
];

const Values = () => {
  const { isMobile } = useMobile();
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
              <video autoPlay muted loop controls={isMobile}>
                <source src={value.videoUrl} type="video/mp4" />
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
