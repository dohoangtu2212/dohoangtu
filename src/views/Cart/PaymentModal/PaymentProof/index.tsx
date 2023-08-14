import FileInput from "@/components/Input/FileInput";
import { Flex, Box } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { COLORS } from "@/constants/theme/colors";

type PaymentProofProps = {
  image: File | null;
  onChange: (image: File) => void;
};
const PaymentProof: FC<PaymentProofProps> = ({ onChange, image }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = useCallback(
    (file: File) => {
      if (!!previewUrl) URL.revokeObjectURL(previewUrl);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onChange(file);
    },
    [previewUrl, onChange]
  );

  return (
    <Flex flexDir="column" gap="2rem">
      <FileInput
        name="Chọn hình"
        accept="image/*"
        onFileSelected={handleFileChange}
      />
      {!!previewUrl && (
        <Flex
          position="relative"
          w="100%"
          h="20rem"
          border="1px"
          borderColor={COLORS.summerBlue}
          borderRadius="lg"
        >
          <Image
            src={previewUrl}
            alt="bank"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default PaymentProof;
