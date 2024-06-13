import { EApproveStatus, IRegisterTeacherRes } from "@/types/registerTeacher";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

type Props = {
  data?: IRegisterTeacherRes;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item?: IRegisterTeacherRes) => void;
};

const ModalApprove = ({ data, isOpen, onClose, onSubmit }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thông tin đăng ký</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" w="full" gap="16px">
            <Flex flexDir="row" gap="16px">
              <Text fontSize="0.875rem" w="100px">
                Họ tên
              </Text>
              <Text fontSize="0.875rem">{data?.fullName}</Text>
            </Flex>
            <Flex flexDir="row" gap="16px">
              <Text fontSize="0.875rem" w="100px">
                Email
              </Text>
              <Text fontSize="0.875rem">{data?.email}</Text>
            </Flex>
            <Flex flexDir="row" gap="16px">
              <Text fontSize="0.875rem" w="100px">
                Số điện thoại
              </Text>
              <Text fontSize="0.875rem">{data?.phoneNumber}</Text>
            </Flex>
            <Flex flexDir="row" gap="16px">
              <Text fontSize="0.875rem" w="100px">
                Kinh nghiệm
              </Text>
              <Text fontSize="0.875rem">{data?.yearsOfExperience} năm</Text>
            </Flex>
            <Flex flexDir="row" gap="16px">
              <Text fontSize="0.875rem" w="100px">
                Vị trí
              </Text>
              <Text fontSize="0.875rem">{data?.position}</Text>
            </Flex>
            <Flex flexDir="row" gap="16px">
              <Text fontSize="0.875rem" w="100px">
                Học vị
              </Text>
              <Text fontSize="0.875rem">{data?.culturalLeveling}</Text>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <Button
            colorScheme="blue"
            isDisabled={data?.status == EApproveStatus.Register}
            onClick={() => {
              onSubmit(data);
            }}
          >
            Xét duyệt
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalApprove;
