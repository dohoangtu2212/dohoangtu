import { Box } from "@chakra-ui/react";
import Script from "next/script";
import type { BoxProps } from "@chakra-ui/react";
import type { FC } from "react";

type VideoProps = BoxProps & {
  dynTubeKey: string;
};
const Video: FC<VideoProps> = ({ dynTubeKey, ...boxProps }) => {
  return (
    <>
      {dynTubeKey && (
        <>
          <Script type="text/javascript" src="/static/dyntube-script.js" />
          <Box
            w="40rem"
            minH="20rem"
            bg="gray.200"
            overflow="hidden"
            {...boxProps}
            dangerouslySetInnerHTML={{
              __html: `<div data-dyntube-key=${dynTubeKey}/>`,
            }}
          />
        </>
      )}
    </>
  );
};

export default Video;
