import { Flex } from "@chakra-ui/react";
import Hero from "@/views/Home/Main/Hero";
import NewestCourses from "@/views/Home/Main/NewestCourses";
import Values from "@/views/Home/Main/Values";

const Main = () => {
  return (
    <Flex flexDir="column" w="100%" gap="2rem">
      <Hero />
      <Values />
      <NewestCourses />
    </Flex>
  );
};

export default Main;
