import { FC } from "react";
import Image from "next/image";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

const FEEDBACKS: string[] = [
  "/images/feedbacks/1.png",
  "/images/feedbacks/2.png",
  "/images/feedbacks/3.png",
  "/images/feedbacks/4.png",
  "/images/feedbacks/5.png",
  "/images/feedbacks/6.png",
  "/images/feedbacks/7.png",
  "/images/feedbacks/8.png",
  "/images/feedbacks/9.png",
  "/images/feedbacks/10.png",
  "/images/feedbacks/11.png",
  "/images/feedbacks/12.png",
  "/images/feedbacks/13.png",
  "/images/feedbacks/14.png",
  "/images/feedbacks/15.png",
  "/images/feedbacks/16.png",
];

type FeedbacksProps = {};
const Feedbacks: FC<FeedbacksProps> = () => {
  return (
    <Flex flexDir="column" bgColor="gray.200" p="2rem" gap="1rem">
      <Text
        fontSize={{ base: "1.75rem", lg: "2.25rem" }}
        fontWeight="700"
        textAlign="center"
      >
        Đánh giá từ cộng đồng
      </Text>
      <Grid
        templateColumns={{
          base: `repeat(1, 1fr)`,
          md: `repeat(2, 1fr)`,
          lg: `repeat(4, 1fr)`,
        }}
        gap="1rem"
      >
        {FEEDBACKS.map((fbUrl) => (
          <GridItem key={fbUrl}>
            <Flex alignItems="center" justifyContent="center">
              <Box
                position="relative"
                w={{ base: "20rem", lg: "30rem" }}
                aspectRatio="5/1"
                borderRadius="md"
                overflow="hidden"
                bgColor="white"
              >
                <Image
                  src={fbUrl}
                  fill
                  alt={fbUrl}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Feedbacks;
