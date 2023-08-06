import { Flex, Box, Text } from "@chakra-ui/react";
import useMobile from "@/hooks/useMobile";
import { FC, useEffect, useRef, useState } from "react";

type IValue = {
  title: string;
  description: string;
  videoUrl: string;
  videoMobileUrl: string;
};
const DEMO_VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FDemo1.mp4?alt=media&token=83867c46-3507-4416-8391-1c1240fdaa1d";

const VALUES: IValue[] = [
  {
    title: "Trọn bộ bài giảng ôn thi đại học từ cơ bản đến nâng cao",
    description:
      "Khóa học cung cấp đầy đủ nội dung lí thuyết và bài tập cần thiết cho kì thi TN THPT môn Toán. Bao gồm 7 chương lớp 12 và 5 bài lớp 11. Kết hợp tư duy bản chất với phương pháp giải nhanh.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo1.mp4?alt=media&token=fc5a610e-2dde-40bd-adf1-ebf27e38103f",
    videoMobileUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo1-mobile.mp4?alt=media&token=83c25316-189a-4784-b404-06ba18cf0123",
  },
  {
    title: "Lí thuyết được minh họa bằng hình động",
    description:
      "Các bài học lí thuyết được minh họa bằng hình vẽ trực quan, sinh động và cực kì cuốn hút. Đảm bảo tiếp thu kiến thức một cách hiệu quả nhất.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo2.mp4?alt=media&token=a1119ee0-ad24-46db-9945-ee89bf10cd07",
    videoMobileUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo2-mobile.mp4?alt=media&token=3c3edb06-1e14-4b66-93c6-9f4eb0dc6033",
  },
  {
    title: "Mô phỏng các khái niệm và hình vẽ không gian trừu tượng",
    description:
      "Hình học không gian trở nên dễ dàng hơn với các hình vẽ được xây dựng một cách công phu và bắt mắt.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo3.mp4?alt=media&token=9bd433d5-6a41-432c-a368-473159a9c4c1",
    videoMobileUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo3-mobile.mp4?alt=media&token=f5e404a6-a666-4752-9848-5ed6fde06714",
  },
  {
    title: "Giải bài tập chi tiết",
    description:
      "Hướng dẫn cụ thể các bước biến đổi trong bài tập, các kiến thức liên quan. Hỗ trợ giải đáp thắc mắc đầy đủ cho học sinh.",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo4.mp4?alt=media&token=452f4efb-f421-4d5e-a415-3545c408b37d",
    videoMobileUrl:
      "https://firebasestorage.googleapis.com/v0/b/online-classroom-de70d.appspot.com/o/assets%2FSo4-mobile.mp4?alt=media&token=9ec2c57b-cebb-4763-9e21-663bf13fab56",
  },
];

const Values = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      gap="2rem"
      backgroundColor="gray.200"
      py={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
    >
      {VALUES.map((value, idx) => {
        return <Value value={value} idx={idx} key={value.title} />;
      })}
    </Flex>
  );
};

type ValueProps = {
  value: IValue;
  idx: number;
};
const Value: FC<ValueProps> = ({ value, idx }) => {
  const { title, description, videoMobileUrl, videoUrl } = value;
  const isEven = idx % 2 === 0;
  const { isMobile, breakpoint } = useMobile();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoSrc, setVideoSrc] = useState<string>(value.videoUrl ?? "");

  useEffect(() => {
    const isMobileOrTablet = isMobile || breakpoint === "md";

    if (isMobileOrTablet) {
      setVideoSrc(videoMobileUrl);
      videoRef.current?.load();
      return;
    }
    setVideoSrc(videoUrl);
    videoRef.current?.load();
  }, [isMobile, breakpoint, videoMobileUrl, videoUrl]);

  return (
    <Flex
      key={title}
      flexDir={{
        base: "column-reverse",
        md: isEven ? "row" : "row-reverse",
      }}
      w={{ base: "100%", md: "80%" }}
      px={{ base: "0.25rem", md: "0" }}
      gap={{ base: "1.5rem", md: "2rem", lg: "4rem" }}
      alignItems="center"
    >
      <Box borderRadius="lg" overflow="hidden" flex="1">
        <video autoPlay muted loop playsInline ref={videoRef}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </Box>
      <Flex flex="1" flexDir="column" px={{ base: "1rem", md: "0" }}>
        <Text fontSize={{ base: "1.25rem", lg: "1.5rem" }} fontWeight="700">
          {title}
        </Text>
        <Text fontSize={{ base: "0.875rem", lg: "1rem" }}>{description}</Text>
      </Flex>
    </Flex>
  );
};

export default Values;
