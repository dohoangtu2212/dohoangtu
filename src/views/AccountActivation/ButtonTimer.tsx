import { Button, Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

type ButtonTimerProps = {
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
};
const ButtonTimer: FC<ButtonTimerProps> = ({ text, isLoading, onClick }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Flex alignItems="center">
      <Button
        mr="0.75rem"
        isLoading={isLoading}
        isDisabled={seconds > 0}
        onClick={() => {
          onClick && onClick();
          setSeconds(59);
        }}
      >
        {text}
      </Button>
      {!isLoading && seconds > 0 ? (
        <p>
          {`Thời gian còn lại: `}
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p></p>
      )}
    </Flex>
  );
};

export default ButtonTimer;
