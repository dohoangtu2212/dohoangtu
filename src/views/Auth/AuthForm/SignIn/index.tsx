import { useToast, useDisclosure } from "@chakra-ui/react";
import { AuthFormValues } from "@/types/auth";
import {
  signInWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import Form from "@/views/Auth/AuthForm/Form";
import { FC, useCallback, useState } from "react";
import { getUserRole } from "@/utils/firebase";
import SetRoleModal from "@/views/Auth/AuthForm/SignUp/SetRoleModal";

type SignInProps = {
  onDone: () => void;
};
const SignIn: FC<SignInProps> = ({ onDone }) => {
  const {
    isOpen: isRoleModalOpen,
    onClose: closeRoleModal,
    onOpen: openRoleModal,
  } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast({
    position: "bottom",
  });

  const signIn = useCallback(
    async (values: AuthFormValues) => {
      const auth = getAuth();
      const { email, password } = values;

      try {
        await signInWithEmailAndPassword(auth, email, password);

        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng bạn.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        const role = await getUserRole();
        if (!role) {
          setEmail(email);
          setPassword(password);
          openRoleModal();
          return;
        }

        onDone?.();
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
          title: "Đăng nhập thất bại!",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [onDone, toast, openRoleModal]
  );

  return (
    <>
      <Form onSubmit={signIn} action="Đăng nhập" />
      <SetRoleModal
        email={email}
        password={password}
        isOpen={isRoleModalOpen}
        onClose={closeRoleModal}
        onDone={onDone}
      />
    </>
  );
};

export default SignIn;
