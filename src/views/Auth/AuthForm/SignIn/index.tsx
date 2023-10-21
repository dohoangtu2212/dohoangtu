import {
  Button,
  Flex,
  Input,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { AuthFormValues } from "@/types/auth";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  AuthErrorCodes,
  AuthError,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import Form from "@/views/Auth/AuthForm/Form";
import { FC, useCallback, useState } from "react";
import { getUserRole } from "@/utils/firebase";
import SetRoleModal from "@/views/Auth/AuthForm/SignUp/SetRoleModal";
import useCustomToast from "@/hooks/useCustomToast";
import { MdArrowBack, MdArrowBackIos, MdArrowLeft } from "react-icons/md";

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
  const [showResetPassword, setShowResetPassword] = useBoolean();

  const toast = useCustomToast();

  const signIn = useCallback(
    async (values: AuthFormValues) => {
      const auth = getAuth();
      const { email, password } = values;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast("Đăng nhập thành công!", "success");

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
        toast("Đăng nhập thất bại!", "error");
      }
    },
    [onDone, toast, openRoleModal]
  );

  return (
    <>
      {showResetPassword ? (
        <ResetPassword onBack={setShowResetPassword.off} />
      ) : (
        <Flex flexDir="column" alignItems="center">
          <Form onSubmit={signIn} action="Đăng nhập" />
          <Button variant="text" onClick={setShowResetPassword.on}>
            Quên mật khẩu?
          </Button>
        </Flex>
      )}

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

interface ResetPasswordProps {
  onBack?: () => void;
}
const ResetPassword: FC<ResetPasswordProps> = ({ onBack }) => {
  const toast = useCustomToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useBoolean();

  const handleResetPassword = useCallback(async () => {
    if (!email) {
      toast("Vui lòng nhập mật khẩu!", "error");
      return;
    }
    setLoading.on();
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    toast("Gửi email thành công. Vui lòng kiểm tra!", "success");
    setLoading.off();
  }, [email, setLoading, toast]);

  return (
    <Flex flexDir="column">
      <Button
        variant="text"
        leftIcon={<MdArrowBack size="1.25rem" />}
        px="0"
        onClick={onBack}
      >
        Trở về
      </Button>
      <Flex flexDir="column" gap="1rem" py="1rem" alignItems="center">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Button onClick={handleResetPassword} isDisabled={loading}>
          Gửi email khôi phục mật khẩu
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;
