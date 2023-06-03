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
      <Flex py="2rem" alignItems="center" justifyContent="center">
        <Container zIndex="40">
          <DescriptionContainer>
            <Text w="max-content" fontSize={{ base: "1rem", md: "1.5rem" }}>
              đăng kí tài khoản
            </Text>
            <Divider
              orientation="vertical"
              borderColor={COLORS.starryNightBlue}
            />
          </DescriptionContainer>
          <ArrowDiv bgColor={COLORS.whiteSatin} position="relative">
            <DisplayImage imageSrc="/images/dang-ki-tai-khoan.png" />
          </ArrowDiv>
          <Box flex="1" />
        </Container>
        <Container zIndex="30">
          <Box flex="1" />
          <ArrowDiv bgColor={COLORS.windmillWings} position="relative">
            <DisplayImage imageSrc="/images/chon-khoa-hoc.png" />
          </ArrowDiv>
          <DescriptionContainer>
            <Divider
              orientation="vertical"
              borderColor={COLORS.starryNightBlue}
            />
            <Text
              textAlign="center"
              w="max-content"
              fontSize={{ base: "1rem", md: "1.5rem" }}
            >
              chọn khoá học
            </Text>
          </DescriptionContainer>
        </Container>
        <Container zIndex="20">
          <DescriptionContainer>
            <Text
              textAlign="center"
              w="max-content"
              fontSize={{ base: "1rem", md: "1.5rem" }}
            >
              nộp học phí
            </Text>
            <Divider
              orientation="vertical"
              borderColor={COLORS.starryNightBlue}
            />
          </DescriptionContainer>
          <ArrowDiv bgColor={COLORS.summerBlue} position="relative">
            <DisplayImage imageSrc="/images/nop-hoc-phi.png" />
          </ArrowDiv>
          <Box flex="1" />
        </Container>
        <Container zIndex="10">
          <Box flex="1" />
          <ArrowDiv bgColor={COLORS.blueLapis} position="relative">
            <DisplayImage imageSrc="/images/bat-dau-hoc.png" />
          </ArrowDiv>
          <DescriptionContainer>
            <Divider
              orientation="vertical"
              borderColor={COLORS.starryNightBlue}
            />
            <Text
              textAlign="center"
              w="max-content"
              fontSize={{ base: "1rem", md: "1.5rem" }}
            >
              bắt đầu học
            </Text>
          </DescriptionContainer>
        </Container>
      </Flex>
    </Flex>
  );
};

type ContainerProps = FlexProps & {};
const Container: FC<ContainerProps> = ({ children, ...flexProps }) => {
  return (
    <Flex
      flexDir="column"
      h="15rem"
      w={{ base: "4rem", md: "8rem" }}
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
      w={{ base: "2.5rem", md: "4.5rem" }}
      h={{ base: "2.25rem", md: "4.5rem" }}
      position="absolute"
      left={{ base: "1.5rem", md: "3.25rem" }}
      top={{ base: "0.5rem", md: "0.75rem" }}
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

export default Guide;
