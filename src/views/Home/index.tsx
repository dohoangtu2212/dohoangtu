import { Flex } from "@chakra-ui/react";
import Hero from "@/views/Home/Hero";
import Values from "@/views/Home/Values";
import Guide from "@/views/Home/Guide";

const Home = () => {
  return (
    <>
      <Flex
        flexDir="column"
        w="100%"
        gap="2rem"
        py={{ base: "1rem", lg: "3rem" }}
      >
        <Hero />
        <Values />
        <Guide />
      </Flex>
    </>
  );
};

export default Home;
