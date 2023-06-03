import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Flex,
  Button,
  ModalProps,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { FC, useCallback, useState } from "react";
import { useUpdateUserRoleMutation } from "@/store/apis/user";
import { UserRole } from "@/types/permission";

type SetRoleModalProps = Omit<ModalProps, "children"> & {
  email: string;
  password: string;
  onDone?: () => void;
};
const SetRoleModal: FC<SetRoleModalProps> = ({
  email,
  password,
  onDone,
  ...modalProps
}) => {
  const toast = useToast({
    position: "bottom",
  });
  const [updateUserRole, { isLoading: isUpdateUserRoleLoading }] =
    useUpdateUserRoleMutation();

  const handleSelectStudent: () => void = useCallback(async () => {
    const auth = getAuth();
    if (!email) return;
    try {
      await updateUserRole({
        email: email,
        role: UserRole.student,
      });
      toast({
        title: "Thành công!",
        description: 'Bạn đang truy cập hệ thống với vai trò "Học sinh".',
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await auth.signOut();
      await signInWithEmailAndPassword(auth, email, password);
      onDone?.();
    } catch (err) {
      toast({
        title: "Lỗi!",
        description: "Cập nhật vai trò thất bại.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [email, password, toast, updateUserRole, onDone]);

  const handleSelectTeacher = useCallback(async () => {
    const auth = getAuth();
    if (!email) return;
    try {
      await updateUserRole({
        email: email,
        role: UserRole.teacher,
      });
      toast({
        title: "Thành công!",
        description: 'Bạn đang truy cập hệ thống với vai trò "Giáo viên".',
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await signInWithEmailAndPassword(auth, email, password);
      onDone?.();
    } catch (err) {
      toast({
        title: "Lỗi!",
        description: "Cập nhật vai trò thất bại.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [email, password, onDone, toast, updateUserRole]);

  return (
    <Modal closeOnEsc={false} closeOnOverlayClick={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent w="25rem">
        <ModalBody as={Flex} flexDir="column" gap="1rem" py="2rem">
          <Text fontWeight="600" textAlign="center">
            Vai trò của bạn trong hệ thống là gì?
          </Text>
          <Flex flexDir="column" gap="0.5rem">
            <Text textAlign="center" fontSize="0.875rem" color="gray">
              Bấm để chọn
            </Text>
            <Flex justifyContent="center" gap="1rem">
              <Button
                w="10rem"
                variant="outline"
                onClick={handleSelectStudent}
                isLoading={isUpdateUserRoleLoading}
              >
                Học sinh
              </Button>
              <Button
                w="10rem"
                variant="outline"
                onClick={handleSelectTeacher}
                isLoading={isUpdateUserRoleLoading}
                isDisabled
              >
                Giáo viên
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SetRoleModal;
