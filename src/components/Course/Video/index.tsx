import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CourseVideo = () => {
  return (
    <Box position="relative" paddingBottom="56.25%" height="0">
      <StyledIframe
        src="https://www.loom.com/embed/1ec5eba5b3aa42e1ac52a22ec8482b6d"
        allowFullScreen
      />
    </Box>
  );
};

export default CourseVideo;
