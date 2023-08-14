import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import CourseOverview from "@/components/Course/CourseOverview";
import { FC } from "react";
import { ICourseDetails } from "@/types/course";

type CourseInfoProps = {
  courseDetails?: ICourseDetails;
};
const CourseInfo: FC<CourseInfoProps> = ({ courseDetails }) => {
  return (
    <Tabs w="100%" px={{ base: "0.5rem", lg: "1rem" }}>
      <TabList w="100%">
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }}>Khái quát</Tab>
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }}>Đánh giá</Tab>
      </TabList>
      <TabPanels>
        {/* Khái quát */}
        <TabPanel px="0">
          <CourseOverview overview={courseDetails?.overview} />
        </TabPanel>

        {/* Đánh giá */}
        <TabPanel px="0">
          <Text>Cập nhật...</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CourseInfo;
