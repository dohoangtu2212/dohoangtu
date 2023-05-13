import { ICourse } from "@/types/course";
import {
  Box,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverAnchor,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import Menu from "@/components/Course/CourseCard/Menu";
import Display from "@/components/Course/CourseCard/Display";

type CourseCardProps = {
  course: ICourse;
};
const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box onMouseLeave={() => setShowMenu(false)} px="0.5rem">
      <Popover isOpen={showMenu} placement="right">
        <PopoverAnchor>
          <Display course={course} onToggleMenu={(val) => setShowMenu(val)} />
        </PopoverAnchor>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Menu course={course} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CourseCard;
