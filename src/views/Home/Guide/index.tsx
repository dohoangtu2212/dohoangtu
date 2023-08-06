import ArrowDiv from "@/components/UI/ArrowDiv";
import { COLORS } from "@/constants/theme";
import { Flex, Text, Box, Divider, FlexProps } from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";

const Guide = () => {
  return (
    <Flex flexDir="column" position="relative" alignItems="center" py="2rem">
      <Text fontSize={{ base: "1.75rem", md: "2.5rem" }} fontWeight="700">
        Quy trình đăng kí học
      </Text>
      <Flex
        py="2rem"
        alignItems="center"
        justifyContent="center"
        gap={{ base: "0.5rem", md: "1rem" }}
      >
        <RegisteStep />
        <CourseStep />
        <FeeStep />
        <LearnStep />
      </Flex>
    </Flex>
  );
};

const RegisteStep = () => {
  return (
    <Container zIndex="40">
      <DescriptionContainer>
        <Text w="max-content" fontSize={{ base: "1rem", md: "1.5rem" }}>
          đăng kí tài khoản
        </Text>
        <Pin direction="up" />
      </DescriptionContainer>
      <ArrowDiv bgColor={COLORS.whiteSatin} position="relative">
        <DisplayImage imageSrc="/images/dang-ki-tai-khoan.png" />
      </ArrowDiv>
      <Box flex="1" />
    </Container>
  );
};

const CourseStep = () => {
  return (
    <Container zIndex="30">
      <Box flex="1" />
      <ArrowDiv bgColor={COLORS.windmillWings} position="relative">
        <DisplayImage imageSrc="/images/chon-khoa-hoc.png" />
      </ArrowDiv>
      <DescriptionContainer>
        <Pin direction="down" />
        <Text
          textAlign="center"
          w="max-content"
          fontSize={{ base: "1rem", md: "1.5rem" }}
        >
          chọn khoá học
        </Text>
      </DescriptionContainer>
    </Container>
  );
};

const FeeStep = () => {
  return (
    <Container zIndex="20">
      <DescriptionContainer>
        <Text
          textAlign="center"
          w="max-content"
          fontSize={{ base: "1rem", md: "1.5rem" }}
        >
          nộp học phí
        </Text>
        <Pin direction="up" />
      </DescriptionContainer>
      <ArrowDiv bgColor={COLORS.summerBlue} position="relative">
        <DisplayImage imageSrc="/images/nop-hoc-phi.png" />
      </ArrowDiv>
      <Box flex="1" />
    </Container>
  );
};

const LearnStep = () => {
  return (
    <Container zIndex="10">
      <Box flex="1" />
      <ArrowDiv bgColor={COLORS.blueLapis} position="relative">
        <DisplayImage imageSrc="/images/bat-dau-hoc.png" />
      </ArrowDiv>
      <DescriptionContainer>
        <Pin direction="down" />
        <Text
          textAlign="center"
          w="max-content"
          fontSize={{ base: "1rem", md: "1.5rem" }}
        >
          bắt đầu học
        </Text>
      </DescriptionContainer>
    </Container>
  );
};

type ContainerProps = FlexProps & {};
const Container: FC<ContainerProps> = ({ children, ...flexProps }) => {
  return (
    <Flex
      flexDir="column"
      h={{ base: "15rem", md: "20rem", lg: "30rem" }}
      w={{ base: "4rem", md: "8rem", lg: "16rem" }}
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

type DescriptionContainerProps = FlexProps & {};
const DescriptionContainer: FC<DescriptionContainerProps> = ({
  children,
  ...flexProps
}) => {
  return (
    <Flex
      flex="1"
      alignItems="center"
      flexDir="column"
      pl={{ base: "2rem", md: "3.5rem" }}
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

type DisplayImageProps = {
  imageSrc: ImageProps["src"];
};
const DisplayImage: FC<DisplayImageProps> = ({ imageSrc }) => {
  return (
    <Box
      w={{ base: "2.5rem", md: "4.5rem", lg: "6rem" }}
      h={{ base: "2.25rem", md: "4.5rem", lg: "6rem" }}
      position="absolute"
      left={{ base: "1.5rem", md: "3.25rem", lg: "8rem" }}
      top={{ base: "0.5rem", md: "0.75rem", lg: '2rem' }}
      zIndex="10"
    >
      <Image
        src={imageSrc}
        alt="image"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

type PinProps = {
  direction?: "up" | "down";
};
const Pin: FC<PinProps> = ({ direction = "up" }) => {
  return (
    <Flex
      h="100%"
      flexDir={direction === "up" ? "column" : "column-reverse"}
      alignItems="center"
    >
      <Box
        w="0.4rem"
        h="0.4rem"
        borderRadius="50%"
        bgColor={COLORS.starryNightBlue}
      />
      <Divider
        orientation="vertical"
        borderColor={COLORS.starryNightBlue}
        opacity="1"
      />
    </Flex>
  );
};

export default Guide;
