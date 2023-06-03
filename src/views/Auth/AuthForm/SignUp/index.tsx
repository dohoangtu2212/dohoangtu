import { useToast, useDisclosure } from "@chakra-ui/react";
import { AuthFormValues } from "@/types/auth";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import Form from "@/views/Auth/AuthForm/Form";
import { FC, useState } from "react";
import SetRoleModal from "@/views/Auth/AuthForm/SignUp/SetRoleModal";

type SignUpProps = {
  onDone: () => void;
};
const SignUp: FC<SignUpProps> = ({ onDone }) => {
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

  const signUp = async (values: AuthFormValues) => {
    const auth = getAuth();
    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail(email);
      setPassword(password);
      openRoleModal();
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

  return (
    <>
      <Form onSubmit={signUp} action="Đăng kí" />
      <SetRoleModal
        email={email}
        password={password}
        onDone={onDone}
        isOpen={isRoleModalOpen}
        onClose={closeRoleModal}
      />
    </>
  );
};

export default SignUp;
