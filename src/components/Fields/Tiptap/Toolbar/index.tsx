import { COLORS } from "@/constants/theme";
import {
  Button,
  ButtonProps,
  Flex,
  IconButton,
  IconButtonProps,
  Divider,
  Box,
} from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { FC } from "react";
import {
  RiBold,
  RiCodeSSlashLine,
  RiItalic,
  RiStrikethrough,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
} from "react-icons/ri";

type ToolbarProps = {
  editor: Editor;
};
const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  return (
    <Flex
      p="0.25rem"
      gap="0.25rem"
      borderBottom={`1px solid ${COLORS.summerBlue}`}
      w="100%"
    >
      <ToolButton
        aria-label="bold"
        isActive={editor.isActive("bold")}
        icon={<RiBold size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolButton
        aria-label="code"
        isActive={editor.isActive("code")}
        icon={<RiCodeSSlashLine size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <ToolButton
        aria-label="italic"
        isActive={editor.isActive("italic")}
        icon={<RiItalic size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolButton
        aria-label="strike-through"
        isActive={editor.isActive("strike")}
        icon={<RiStrikethrough size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <Box>
        <Divider orientation="vertical" />
      </Box>
      <ToolButton
        aria-label="h1"
        isActive={editor.isActive("heading", { level: 1 })}
        icon={<RiH1 size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <ToolButton
        aria-label="h2"
        isActive={editor.isActive("heading", { level: 2 })}
        icon={<RiH2 size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolButton
        aria-label="h3"
        isActive={editor.isActive("heading", { level: 3 })}
        icon={<RiH3 size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <ToolButton
        aria-label="h4"
        isActive={editor.isActive("heading", { level: 4 })}
        icon={<RiH4 size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      />
      <ToolButton
        aria-label="h5"
        isActive={editor.isActive("heading", { level: 5 })}
        icon={<RiH5 size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      />
      <ToolButton
        aria-label="h6"
        isActive={editor.isActive("heading", { level: 6 })}
        icon={<RiH6 size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      />
      <ToolButton
        aria-label="paragraph"
        icon={<RiParagraph size="1.25rem" />}
        onClick={() => editor.chain().focus().setParagraph().run()}
      />
      <ToolButton
        aria-label="list-ordered"
        isActive={editor.isActive("orderedList")}
        icon={<RiListOrdered size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolButton
        aria-label="list-bullet"
        isActive={editor.isActive("bulletList")}
        icon={<RiListUnordered size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
    </Flex>
  );
};

type ToolButtonProps = IconButtonProps & {};
const ToolButton: FC<ToolButtonProps> = ({ isActive, ...buttonProps }) => {
  return (
    <IconButton
      p="0.25rem"
      w="fit-content"
      minW="none"
      minH="0"
      h="fit-content"
      borderRadius="0.25rem"
      variant={isActive ? "solid" : "ghost"}
      {...buttonProps}
    />
  );
};

export default Toolbar;
