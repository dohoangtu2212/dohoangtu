import * as Yup from "yup";
import { emailRegex } from "@/constants/regex";

export const AUTH_ERRORS = {
  invalidEmail: "Địa chỉ email không hợp lệ.",
  noEmail: "Địa chỉ email chưa được điền.",
  noPassword: "Mật khẩu chưa được điền.",
};

export enum AuthMode {
  signIn = "sign-in",
  signUp = "sign-up",
}

export const emailValidation = Yup.string()
  .matches(emailRegex, AUTH_ERRORS.invalidEmail)
  .required(AUTH_ERRORS.noEmail);

export const passwordValidation = Yup.string().required(AUTH_ERRORS.noPassword);

export const signInFormValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
