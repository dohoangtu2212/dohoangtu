import { FC } from "react";
import Image from "next/image";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { IManagePageRes } from "@/types/managePage";

type FeedbacksProps = {
  data: IManagePageRes | null;
};
const Feedbacks: FC<FeedbacksProps> = ({ data }) => {
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
          lg: `repeat(3, 1fr)`,
        }}
        gap="1rem"
      >
        {data?.reviews.map((review) => (
          <GridItem key={review.imageUrl}>
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
                  src={review.imageUrl ?? ""}
                  fill
                  alt={review.imageUrl ?? ""}
                  sizes="(min-width: 30em) 20rem, 30rem"
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
