import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { COLORS } from "@/constants/theme/colors";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { AuthMode } from "@/constants/auth";
import { DEMO_COURSE_ID } from "@/constants/course";
import useMobile from "@/hooks/useMobile";
import { FC } from "react";
import { robotoSlab, sedgwickAve } from "@/fonts";
import { IManagePageRes } from "@/types/managePage";

type HeroProps = {
  data: IManagePageRes | null;
};

const Hero = ({ data }: HeroProps) => {
  return (
    <Flex
      gap={{ base: "1rem", lg: "2rem" }}
      flexDir={{ base: "column", md: "row" }}
      py={{ base: "1rem", lg: "2rem" }}
      px={{ base: "1rem", lg: "0" }}
    >
      <BriefIntro data={data} />
      <Preview data={data} />
    </Flex>
  );
};

type BriefIntroProps = {
  data: IManagePageRes | null;
};
const BriefIntro: FC<BriefIntroProps> = ({ data }) => {
  const { isMobile } = useMobile();

  return (
    <Flex
      flex="1"
      flexDir="column"
      alignItems="center"
      pr={{ base: "0", lg: "2rem" }}
    >
      <Box w={{ base: "100%", lg: "35rem" }}>
        <Box className={robotoSlab.className}>
          <Text
            fontSize={{ base: "2rem", lg: "3.25rem" }}
            textAlign="right"
            w="max-content"
          >
            {data?.introduceTextFirst}
          </Text>
          <Flex
            gap="1rem"
            alignItems="flex-start"
            justifyContent={{ base: "flex-end", lg: "flex-end" }}
          >
            <Text fontSize={{ base: "1.25rem", lg: "2.5rem" }}>
              {data?.introduceTextSecond}
            </Text>
            <Text
              fontSize={{ base: "4rem", lg: "6rem" }}
              lineHeight="4rem"
              fontWeight="700"
              textShadow={`3px 3px ${COLORS.summerBlue}`}
            >
              {data?.introduceTextThird}
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
          w={{ base: "auto", md: "100%" }}
          whiteSpace="break-spaces"
        >
          {data?.description}
          {/* Toàn bộ bài giảng được xây dựng dưới dạng hình ảnh
          {!isMobile && <br />} chuyển động cực kì trực quan, bắt mắt và dễ hiểu */}
        </Text>
        <Box py={{ base: "0", lg: "2rem" }} w="100%">
          <Actions />

          <Flex alignItems="flex-end">
            <Text
              fontWeight="700"
              w={{ base: "12rem", lg: "18rem" }}
              className={sedgwickAve.className}
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

type PreviewProps = {
  data: IManagePageRes | null;
};
const Preview: FC<PreviewProps> = ({ data }) => {
  return (
    <Flex flex="1" flexDir="column">
      <Flex
        w={{ base: "100%", lg: "40rem" }}
        px={{ base: "0.25rem", lg: "0" }}
        flexDir="column"
        alignItems="center"
      >
        <Box borderRadius="lg" overflow="hidden">
          {data?.introVideoUrl && (
            <video
              loop
              poster={data?.thumbnailUrl ?? "/images/thumbnail.png"}
              controls
            >
              <source src={data?.introVideoUrl} type="video/mp4" />
            </video>
          )}
        </Box>
        <Flex
          alignItems="center"
          gap={{ base: "1rem", lg: "2rem" }}
          py={{ base: "0", lg: "1rem" }}
        >
          {data?.commits.map((commit) => (
            <Flex flexDir="column" alignItems="center" key={commit.title}>
              <Box
                position="relative"
                w={{ base: "6rem", lg: "13.5rem" }}
                h={{ base: "6rem", lg: "12rem" }}
              >
                <Image
                  src={commit.imageUrl ?? ""}
                  alt={commit.title}
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
                {commit.title}
              </Text>
            </Flex>
          ))}
          {/* {STICKERS.map((sticker) => (
       
          ))} */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
