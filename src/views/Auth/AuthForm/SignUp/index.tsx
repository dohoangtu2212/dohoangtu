import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  useDisclosure,
  Flex,
  Button,
} from "@chakra-ui/react";
import { AuthFormValues } from "@/types/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import Form from "@/views/Auth/AuthForm/Form";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";
import { useCallback, useState } from "react";
import { useUpdateUserRoleMutation } from "@/store/apis/user";
import { UserRole } from "@/types/permission";

const SignUp = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [updateUserRole, { isLoading: isUpdateUserRoleLoading }] =
    useUpdateUserRoleMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const toast = useToast({
    position: "bottom",
  });

  const signUp = async (values: AuthFormValues) => {
    const auth = getAuth();
    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail(email);
      setPassword(password);
      onOpen();
    } catch (err) {
      const { code } = err as AuthError;
      let message = "Đã xảy ra lỗi.";

      if (code === AuthErrorCodes.INVALID_EMAIL) {
        message = "Tài khoản không hợp lệ.";
      }

      if (code === AuthErrorCodes.USER_DELETED) {
        message = "Tài khoản chưa đăng ký.";
      }

      toast({
        title: "Đăng ký thất bại!",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectStudent = useCallback(async () => {
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
      await signInWithEmailAndPassword(auth, email, password);
      router.push(ROUTE.studentHome);
    } catch (err) {
      toast({
        title: "Lỗi!",
        description: "Cập nhật vai trò thất bại.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [email, password, router, toast, updateUserRole]);

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
      router.push(ROUTE.teacherHome);
    } catch (err) {
      toast({
        title: "Lỗi!",
        description: "Cập nhật vai trò thất bại.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [email, password, router, toast, updateUserRole]);

  return (
    <>
      <Form onSubmit={signUp} action="Đăng ký" />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
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
                >
                  Giáo viên
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
