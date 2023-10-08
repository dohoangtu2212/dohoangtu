import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import CourseOverview from "@/components/Course/CourseOverview";
import { FC, ReactNode } from "react";
import { ICourseDetails } from "@/types/course";
import useMobile from "@/hooks/useMobile";

type CourseInfoProps = {
  courseDetails?: ICourseDetails;
  courseSectionsNode?: ReactNode;
};
const CourseInfo: FC<CourseInfoProps> = ({
  courseDetails,
  courseSectionsNode,
}) => {
  const { isMobile } = useMobile();

  return (
    <Tabs w="100%" px={{ base: "0.5rem", lg: "1rem" }}>
      <TabList w="max-content">
        {isMobile && (
          <Tab fontSize={{ base: "0.875rem", lg: "1rem" }}>Bài giảng</Tab>
        )}
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }}>Tổng quan</Tab>
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }}>Hỏi đáp</Tab>
        <Tab fontSize={{ base: "0.875rem", lg: "1rem" }}>Thông báo</Tab>
      </TabList>
      <TabPanels>
        {isMobile && <TabPanel>{courseSectionsNode}</TabPanel>}
        <TabPanel px="0">
          <CourseOverview overview={courseDetails?.overview} />
        </TabPanel>

        <TabPanel px="0">
          <Text>Cập nhật...</Text>
        </TabPanel>

        <TabPanel px="0">
          <Text>Cập nhật...</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CourseInfo;
