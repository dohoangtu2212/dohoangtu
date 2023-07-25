import { ICourse } from "@/types/course";
import {
  Box,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverAnchor,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import Menu from "@/components/Course/CourseCard/Menu";
import Display from "@/components/Course/CourseCard/Display";
import useMobile from "@/hooks/useMobile";
import { useRouter } from "next/router";

type CourseCardProps = {
  course: ICourse;
  isPurchased?: boolean;
};
const CourseCard: FC<CourseCardProps> = ({ course, isPurchased }) => {
  const { isMobile } = useMobile();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box onMouseLeave={() => setShowMenu(false)}>
      <Popover
        isOpen={showMenu}
        placement={isMobile ? "bottom" : "right-start"}
      >
        <PopoverAnchor>
          <Display course={course} onToggleMenu={(val) => setShowMenu(val)} />
        </PopoverAnchor>
        <PopoverContent w={{ base: "100vw", md: "20rem" }}>
          <PopoverArrow />
          {isMobile && (
            <PopoverCloseButton onClick={() => setShowMenu(false)} />
          )}
          <PopoverBody>
            <Menu course={course} isPurchased={isPurchased} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CourseCard;
