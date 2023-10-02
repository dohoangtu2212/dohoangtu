import { Box, Button, Flex, Text } from "@chakra-ui/react";
import "@fontsource/roboto-slab";
import "@fontsource/sedgwick-ave";
import { COLORS } from "@/constants/theme/colors";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { AuthMode } from "@/constants/auth";
import { DEMO_COURSE_ID } from "@/constants/course";
import useMobile from "@/hooks/useMobile";
import { FC } from "react";

const DEMO_VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FDemo1.mp4?alt=media&token=83867c46-3507-4416-8391-1c1240fdaa1d";

const STICKERS = [
  {
    imageUrl: "/images/sticker-1.png",
    text: "Video chất lượng cao",
  },
  {
    imageUrl: "/images/sticker-2.png",
    text: "Bài tập phong phú",
  },
  {
    imageUrl: "/images/sticker-3.png",
    text: "Hỗ trợ nhiệt tình",
  },
];

const Hero = () => {
  return (
    <Flex
      gap={{ base: "1rem", lg: "2rem" }}
      flexDir={{ base: "column", md: "row" }}
      py={{ base: "1rem", lg: "2rem" }}
      px={{ base: "1rem", lg: "0" }}
    >
      <BriefIntro />
      <Preview />
    </Flex>
  );
};

type BriefIntroProps = {};
const BriefIntro: FC<BriefIntroProps> = () => {
  const { isMobile } = useMobile();

  return (
    <Flex
      flex="1"
      flexDir="column"
      alignItems="center"
      pr={{ base: "0", lg: "2rem" }}
    >
      <Box w={{ base: "100%", lg: "35rem" }}>
        <Box fontFamily="Roboto Slab">
          <Text
            fontSize={{ base: "2rem", lg: "3.25rem" }}
            textAlign="right"
            w="max-content"
          >
            Chinh phục môn TOÁN
          </Text>
          <Flex
            gap="1rem"
            alignItems="flex-start"
            justifyContent={{ base: "flex-end", lg: "flex-end" }}
          >
            <Text fontSize={{ base: "1.25rem", lg: "2.5rem" }}>
              kì thi THPT QG
            </Text>
            <Text
              fontSize={{ base: "4rem", lg: "6rem" }}
              lineHeight="4rem"
              fontWeight="700"
              textShadow={`3px 3px ${COLORS.summerBlue}`}
            >
              2024
            </Text>
          </Flex>
        </Box>
        <Text
          color={COLORS.midnightNavy}
          mx="auto"
          fontWeight="700"
          fontSize={{ base: "1rem", lg: "1.25rem" }}
          my={{ base: "1rem", lg: "3rem" }}
          textAlign={{ base: "center", lg: "right" }}
          w={{ base: "auto", md: "max-content" }}
        >
          Toàn bộ bài giảng được xây dựng dưới dạng hình ảnh
          {!isMobile && <br />} chuyển động cực kì trực quan, bắt mắt và dễ hiểu
        </Text>
        <Box py={{ base: "0", lg: "2rem" }} w="100%">
          <Actions />

          <Flex alignItems="flex-end">
            <Text
              fontWeight="700"
              w={{ base: "12rem", lg: "18rem" }}
              fontFamily="Sedgwick Ave"
              textAlign="right"
              color={COLORS.midnightNavy}
              fontSize="1.25rem"
              py="1rem"
            >
              Học thử ngay
            </Text>
            <Box
              position="relative"
              w={{ base: "6rem", lg: "10rem" }}
              h={{ base: "6rem", lg: "8rem" }}
              ml="-1rem"
            >
              <Image
                src="/images/sticker-arrow.png"
                alt="arrow"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

const Actions = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push({
      pathname: ROUTE.auth,
      query: {
        mode: AuthMode.signUp,
      },
    });
  };

  const handleViewDemoCourse = () => {
    router.push({
      pathname: ROUTE.demoCourseView,
      query: {
        courseId: DEMO_COURSE_ID,
      },
    });
  };

  return (
    <Flex
      gap="1rem"
      w={{ base: "100%", lg: "100%" }}
      justifyContent={{ base: "center", lg: "center" }}
    >
      <Button
        px="2.5rem"
        bgColor="#ec5265"
        border="1px solid #ec5265"
        _hover={{
          bgColor: "transparent",
          color: "#ec5265",
          border: "1px solid #ec5265",
        }}
        py="0.5rem"
        h="fit-content"
        fontSize="1.25rem"
        variant="solid"
        color="white"
        onClick={handleSignUp}
      >
        Đăng kí
      </Button>
      <Button
        px="2.5rem"
        variant="outline"
        py="0.5rem"
        h="fit-content"
        fontSize="1.25rem"
        onClick={handleViewDemoCourse}
      >
        Học thử
      </Button>
    </Flex>
  );
};

type PreviewProps = {};
const Preview: FC<PreviewProps> = () => {
  return (
    <Flex flex="1" flexDir="column">
      <Flex
        w={{ base: "100%", lg: "40rem" }}
        px={{ base: "0.25rem", lg: "0" }}
        flexDir="column"
        alignItems="center"
      >
        <Box borderRadius="lg" overflow="hidden">
          <video loop poster="/images/thumbnail.png" controls>
            <source src={DEMO_VIDEO_URL} type="video/mp4" />
          </video>
        </Box>
        <Flex
          alignItems="center"
          gap={{ base: "1rem", lg: "2rem" }}
          py={{ base: "0", lg: "1rem" }}
        >
          {STICKERS.map((sticker) => (
            <Flex flexDir="column" alignItems="center" key={sticker.text}>
              <Box
                position="relative"
                w={{ base: "6rem", lg: "13.5rem" }}
                h={{ base: "6rem", lg: "12rem" }}
              >
                <Image
                  src={sticker.imageUrl}
                  alt={sticker.text}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Text
                fontWeight="700"
                fontSize={{ base: "0.875rem", lg: "1.25rem" }}
                textAlign="center"
              >
                {sticker.text}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
