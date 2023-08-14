import { Flex, Text, Box } from "@chakra-ui/react";
import { FC } from "react";
import styled from "@emotion/styled";

const ContentWrapper = styled(Box)`
  h1 {
    font-size: 2.125rem;
    font-weight: 700;
  }
  h2 {
    font-size: 1.875rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  h4 {
    font-size: 1.25rem;
    font-weight: 700;
  }
  h5 {
    font-size: 1.125rem;
    font-weight: 700;
  }
  h6 {
    font-size: 1rem;
    font-weight: 700;
  }
  ul,
  ol {
    margin-left: 2rem;
  }
  code {
    background-color: #d6e5f2;
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
  }
`;

type CourseOverviewProps = {
  overview?: string;
};
const CourseOverview: FC<CourseOverviewProps> = ({ overview }) => {
  return (
    <Flex flexDir="column" gap="0.5rem">
      <Text fontSize={{ base: "1rem", lg: "1.25rem" }} fontWeight="700">
        Khái quát khoá học
      </Text>
      {!!overview ? (
        <ContentWrapper dangerouslySetInnerHTML={{ __html: overview }} />
      ) : (
        <Text>Cập nhật...</Text>
      )}
    </Flex>
  );
};

export default CourseOverview;
