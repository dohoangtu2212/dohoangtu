import { useDisclosure } from "@chakra-ui/react";
import { AuthFormValues } from "@/types/auth";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import Form from "@/views/Auth/AuthForm/Form";
import { FC, useState } from "react";
import SetRoleModal from "@/views/Auth/AuthForm/SignUp/SetRoleModal";
import useCustomToast from "@/hooks/useCustomToast";
import { useUpdateUserRoleMutation } from "@/store/apis/user";
import { UserRole } from "@/types/permission";

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
  const [updateUserRole, { isLoading: isUpdateUserRoleLoading }] =
    useUpdateUserRoleMutation();

  const toast = useCustomToast();

  const signUp = async (values: AuthFormValues) => {
    const auth = getAuth();
    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateUserRole({
        email: email,
        role: UserRole.student,
      });
      toast('Bạn đang truy cập hệ thống với vai trò "Học sinh".', "success");
      await signInWithEmailAndPassword(auth, email, password);
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

      toast("Đăng ký thất bại!", "success");
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
