import { Flex, Text, IconButton, Button, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { MdOutlineDelete, MdAddCircleOutline } from "react-icons/md";
import Link from "next/link";

interface LessonLinksProps {
  links: string[];
  onLinksChange: (links: string[]) => void;
}
const LessonLinks: FC<LessonLinksProps> = ({ links = [], onLinksChange }) => {
  const [tmpLinks, setTmpLinks] = useState<string[]>([]);

  return (
    <Flex flexDir="column" w="100%" gap="0.5rem">
      <Flex alignItems="center" gap="0.5rem">
        <Text fontWeight="700">Links</Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          px="0.5rem"
          borderRadius="md"
          bgColor="gray.300"
        >
          <Text>
            {links.length}
            {!!tmpLinks.length ? `+${tmpLinks.length}` : ""}
          </Text>
        </Flex>
        <IconButton
          p="0"
          variant="text"
          icon={<MdAddCircleOutline size="1.25rem" />}
          aria-label="add-link"
          onClick={() => setTmpLinks((pre) => [...pre, ""])}
        />
      </Flex>
      <Flex flexDir="column" gap="0.5rem">
        {links.map((link, idx) => {
          return (
            <Flex
              key={`link-${idx}`}
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href={link} passHref={true} target="_blank">
                <Text textDecoration="underline">{link}</Text>
              </Link>
              <IconButton
                p="0"
                aria-label="delete"
                icon={<MdOutlineDelete size="1.5rem" />}
                variant="text"
                onClick={() => onLinksChange(links.filter((li) => li !== link))}
              />
            </Flex>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="0.5rem">
        {tmpLinks.map((link, idx) => {
          return (
            <Flex key={`tmp-link-${idx}`} alignItems="center" gap="0.5rem">
              <Input
                value={link}
                onChange={(ev) => {
                  const val = ev.target.value;
                  setTmpLinks((pre) => {
                    const draft = [...pre];
                    draft[idx] = val;
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
                  setTmpLinks((pre) => {
                    const draft = [...pre];
                    draft.splice(idx, 1);
                    return draft;
                  })
                }
              />
            </Flex>
          );
        })}
      </Flex>
      {!!tmpLinks.length && (
        <Button
          onClick={() => {
            onLinksChange([...links, ...tmpLinks]);
            setTmpLinks([]);
          }}
        >
          Lưu links
        </Button>
      )}
    </Flex>
  );
};

export default LessonLinks;
