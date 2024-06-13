import { Flex } from "@chakra-ui/react";
import Hero from "@/views/Home/Hero";
import Values from "@/views/Home/Values";
import Guide from "@/views/Home/Guide";
import Feedbacks from "@/views/Home/Feedbacks";
import { useGetManagePageQuery } from "@/store/apis/db";

const Home = () => {
  const {
    data: managePage = null,
    isLoading: isGetManagePageLoading,
    isFetching: isGetManagePageFetching,
  } = useGetManagePageQuery(null);

  return (
    <>
      <Flex
        flexDir="column"
        w="100%"
        gap="2rem"
        py={{ base: "1rem", lg: "3rem" }}
      >
        <Hero data={managePage} />
        <Values data={managePage} />
        <Guide />
        <Feedbacks data={managePage} />
      </Flex>
    </>
  );
};

export default Home;
