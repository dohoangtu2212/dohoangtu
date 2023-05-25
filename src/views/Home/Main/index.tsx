import { Flex } from "@chakra-ui/react";
import Hero from "@/views/Home/Main/Hero";
import Values from "@/views/Home/Main/Values";
import Guide from "@/views/Home/Main/Guide";

const Main = () => {
  return (
    <Flex flexDir="column" w="100%" gap="2rem">
      <Hero />
      <Values />
      <Guide />
    </Flex>
  );
};

export default Main;
