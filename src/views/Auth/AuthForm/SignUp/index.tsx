import { useDisclosure } from "@chakra-ui/react";
import { SignUpFormValues } from "@/types/auth";

import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FC, useState } from "react";
import SetRoleModal from "@/views/Auth/AuthForm/SignUp/SetRoleModal";
import useCustomToast from "@/hooks/useCustomToast";
import { UserRole } from "@/types/permission";
import SignUpForm from "../SignUpForm";
import { ICreateUser } from "@/types/user";
import { CustomErrorCodes } from "@/constants/auth";
import { useRegisterUserMutation } from "@/store/apis/auth";

type SignUpProps = {
  onDone: () => void;
};
const SignUp: FC<SignUpProps> = ({ onDone }) => {
  const {
    isOpen: isRoleModalOpen,
    onClose: closeRoleModal,
    onOpen: openRoleModal,
  } = useDisclosure();
  const [registerUser, { isLoading: isRegisterUserLoading }] =
    useRegisterUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useCustomToast();

  const signUp = async (values: SignUpFormValues) => {
    const { email, password, fullName, address, schoolName } = values;

    try {
      const auth = getAuth();
      const req: ICreateUser = {
        email: email,
        password: password,
        role: UserRole.student,
        fullName: fullName,
        schoolName: schoolName,
        address: address,
      };
      const res = await registerUser(req).unwrap();
      if (res.success) {
        toast('Bạn đang truy cập hệ thống với vai trò "Học sinh".', "success");
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        let message = "Đăng ký thất bại!";
        const { code } = res.error;
        if (code === CustomErrorCodes.EMAIL_ALREADY_EXISTS) {
          message = "Email này đã được sử dụng bởi một tài khoản khác.";
        }
        if (code === AuthErrorCodes.INVALID_EMAIL) {
          message = "Tài khoản không hợp lệ.";
        }
        if (code === AuthErrorCodes.INVALID_EMAIL) {
          message = "Tài khoản không hợp lệ.";
        }
        if (code === AuthErrorCodes.USER_DELETED) {
          message = "Tài khoản chưa đăng ký.";
        }
        toast(message, "error");
      }

      onDone?.();
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <SignUpForm onSubmit={signUp} action="Đăng kí" />
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
