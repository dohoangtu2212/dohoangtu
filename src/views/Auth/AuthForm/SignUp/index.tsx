import { useToast } from "@chakra-ui/react";
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

const SignUp = () => {
  const router = useRouter();
  const toast = useToast({
    position: "bottom",
  });

  const signUp = async (values: AuthFormValues) => {
    const auth = getAuth();
    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast({
        title: "Đăng ký thành công!",
        description: "Chào mừng bạn.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      await signInWithEmailAndPassword(auth, email, password);
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

  return <Form onSubmit={signUp} action="Đăng ký" />;
};

export default SignUp;
