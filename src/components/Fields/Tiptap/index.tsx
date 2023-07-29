import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Flex, theme } from "@chakra-ui/react";
import Toolbar from "@/components/Fields/Tiptap/Toolbar";
import { COLORS } from "@/constants/theme";
import styled from "@emotion/styled";
import { FC } from "react";

const ContentWrapper = styled(Box)`
  .ProseMirror {
    h1 {
      font-size: 2.125rem;
      font-weight: 700;
    }
    h2 {
      font-size: 1.875rem;
      font-weight: 700;
    }
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
    }
    h4 {
      font-size: 1.25rem;
      font-weight: 700;
    }
    h5 {
      font-size: 1.125rem;
      font-weight: 700;
    }
    h6 {
      font-size: 1rem;
      font-weight: 700;
    }
    ul,
    ol {
      margin-left: 2rem;
    }
    code {
      background-color: #d6e5f2;
      padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
    }
  }
`;

type TiptapProps = {
  defaultValue?: string;
  onHtmlChange?: (html: string) => void;
};
const Tiptap: FC<TiptapProps> = ({
  onHtmlChange,
  defaultValue = "Cập nhật...",
}) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: defaultValue,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onHtmlChange?.(html);
      },
    },
    [defaultValue]
  );

  return (
    <Flex
      flexDir="column"
      border={`1px solid ${COLORS.summerBlue}`}
      borderRadius="md"
    >
      {!!editor && <Toolbar editor={editor} />}
      <Box p="0.5rem 0.75rem" minH="10rem">
        <ContentWrapper>
          <EditorContent editor={editor} />
        </ContentWrapper>
      </Box>
    </Flex>
  );
};

export default Tiptap;
