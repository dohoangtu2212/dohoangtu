import {
  Flex,
  Text,
  IconButton,
  Button,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { MdAddCircleOutline, MdOutlineDelete } from "react-icons/md";
import { ICourseLessonPractice } from "@/types/course";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import useCustomToast from "@/hooks/useCustomToast";

interface LessonPracticesProps {
  practices?: ICourseLessonPractice[];
  onPracticesChange?: (practices: ICourseLessonPractice[]) => void;
}
const LessonPractices: FC<LessonPracticesProps> = ({
  practices = [],
  onPracticesChange,
}) => {
  const toast = useCustomToast();
  const [tmpPractices, setTmpPractices] = useState<ICourseLessonPractice[]>([]);

  return (
    <Flex flexDir="column" gap="0.5rem">
      <Flex alignItems="center" gap="0.5rem">
        <Text fontWeight="700">Câu hỏi</Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          px="0.5rem"
          borderRadius="md"
          bgColor="gray.300"
        >
          <Text>
            {practices.length}
            {!!tmpPractices.length ? `+${tmpPractices.length}` : ""}
          </Text>
        </Flex>
        <IconButton
          p="0"
          variant="text"
          icon={<MdAddCircleOutline size="1.25rem" />}
          aria-label="add-link"
          onClick={() =>
            setTmpPractices((pre) => [
              ...pre,
              {
                question: "",
                answers: Array(4).fill(""),
                correctAnswer: "",
              },
            ])
          }
        />
      </Flex>
      <Flex flexDir="column" gap="0.5rem">
        {practices.map(({ question, answers, correctAnswer }, practiceIdx) => {
          const practiceKey = `practice-${practiceIdx}`;
          return (
            <Flex key={practiceKey} flexDir="column" gap="0.5rem">
              <Text fontWeight="500" fontSize="1.25rem">{`Q${
                practiceIdx + 1
              }: ${question}`}</Text>
              <Flex flexDir="column" gap="0.25rem" pl="1rem">
                {answers.map((answer, answerIdx) => {
                  return (
                    <Flex
                      key={`${practiceKey}_answer-${answerIdx}`}
                      alignItems="center"
                      gap="0.5rem"
                    >
                      {answer === correctAnswer ? (
                        <MdCheckBox size="1.5rem" />
                      ) : (
                        <MdCheckBoxOutlineBlank size="1.5rem" />
                      )}
                      <Text>{answer}</Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="0.5rem">
        {tmpPractices.map(
          ({ question, answers, correctAnswer }, practiceIdx) => {
            const practiceKey = `tmp-practice-${practiceIdx}`;
            return (
              <Flex key={practiceKey} flexDir="column" gap="0.5rem">
                <Flex alignItems="center" gap="0.5rem">
                  <Text fontWeight="500" fontSize="1.25rem">{`Q${
                    practiceIdx + 1
                  }`}</Text>
                  <Input
                    value={question}
                    onChange={(ev) => {
                      const val = ev.target.value;
                      setTmpPractices((pre) => {
                        const draft = [...pre];
                        draft[practiceIdx].question = val;
                        return draft;
                      });
                    }}
                  />
                  <IconButton
                    p="0"
                    aria-label="delete"
                    icon={<MdOutlineDelete size="1.5rem" />}
                    variant="text"
                    onClick={() =>
                      setTmpPractices((pre) => {
                        const draft = [...pre];
                        draft.splice(practiceIdx, 1);
                        return draft;
                      })
                    }
                  />
                </Flex>
                <Flex flexDir="column" gap="0.25rem" pl="1rem">
                  {answers.map((answer, answerIdx) => {
                    return (
                      <Flex
                        key={`${practiceKey}_answer-${answerIdx}`}
                        alignItems="center"
                        gap="0.5rem"
                      >
                        <Checkbox
                          isChecked={answer === correctAnswer && !!answer}
                          onChange={(ev) => {
                            const isChecked = ev.target.checked;
                            if (isChecked) {
                              setTmpPractices((pre) => {
                                const draft = [...pre];
                                draft[practiceIdx].correctAnswer = answer;
                                return draft;
                              });
                              return;
                            }
                          }}
                        />
                        <Input
                          value={answer}
                          onChange={(ev) => {
                            const val = ev.target.value;
                            setTmpPractices((pre) => {
                              const draft = [...pre];
                              draft[practiceIdx].answers[answerIdx] = val;
                              return draft;
                            });
                          }}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            );
          }
        )}
      </Flex>
      {!!tmpPractices.length && (
        <Button
          onClick={() => {
            const isValid = !tmpPractices.find(
              ({ correctAnswer, answers }) =>
                !correctAnswer || !!answers.find((ans) => !ans)
            );

            if (!isValid) {
              toast("Bài tập không hợp lệ!", "error");
              return;
            }

            onPracticesChange?.([...practices, ...tmpPractices]);
            setTmpPractices([]);
          }}
        >
          Lưu bài tập
        </Button>
      )}
    </Flex>
  );
};

export default LessonPractices;
