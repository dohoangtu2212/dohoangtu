import { Box } from "@chakra-ui/react";
import Script from "next/script";
import type { BoxProps } from "@chakra-ui/react";
import { FC, useEffect } from "react";

type VideoProps = BoxProps & {
  dynTubeKey: string;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
};
const Video: FC<VideoProps> = ({
  dynTubeKey,
  onEnded,
  onPlay,
  onPause,
  onTimeUpdate,
  ...boxProps
}) => {
  useEffect(() => {
    const dyntubePlayerReadyEvHandler = (event: any) => {
      var video = event.video;
      var player = event.player;

      //This event gets fired when time is update for the video.
      player.on("timeupdate", function () {
        onTimeUpdate?.(player?.currentTime());
      });

      //This events get fired when video starts playing.
      player.on("play", function () {
        onPlay?.();
      });

      //This event gets fired when video is paused.
      player.on("pause", function () {
        onPause?.();
      });

      //This event gets fired when video is ended.
      player.on("ended", function () {
        onEnded?.();
      });
    };

    if (!!dynTubeKey) {
      window.addEventListener(
        "dyntubePlayerReady",
        dyntubePlayerReadyEvHandler
      );
    }

    return () => {
      window.removeEventListener(
        "dyntubePlayerReady",
        dyntubePlayerReadyEvHandler
      );
    };
  }, [dynTubeKey, onEnded, onPause, onPlay, onTimeUpdate]);

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
