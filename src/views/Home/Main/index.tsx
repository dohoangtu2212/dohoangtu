import { Flex } from "@chakra-ui/react";
import Hero from "@/views/Home/Main/Hero";
import NewestCourses from "@/views/Home/Main/NewestCourses";

const Main = () => {
  return (
    <Flex flexDir="column" w="100%" gap="2rem">
      <Hero />
      <NewestCourses />
    </Flex>
  );
};

export default Main;
