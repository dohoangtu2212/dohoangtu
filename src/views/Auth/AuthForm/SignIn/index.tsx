import { useToast } from "@chakra-ui/react";
import { AuthFormValues } from "@/types/auth";
import {
  signInWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import Form from "@/views/Auth/AuthForm/Form";
import { useRouter } from "next/router";
import { ROUTE } from "@/constants/route";

const SignIn = () => {
  const router = useRouter();
  const toast = useToast({
    position: "bottom",
  });

  const signIn = async (values: AuthFormValues) => {
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

      router.push(ROUTE.app);
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
  };

  return <Form onSubmit={signIn} action="Đăng nhập" />;
};

export default SignIn;
