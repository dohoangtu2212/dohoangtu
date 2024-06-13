import * as Yup from "yup";
import { emailRegex } from "@/constants/regex";

const phoneRegExp = /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const AUTH_ERRORS = {
  invalidEmail: "Địa chỉ email không hợp lệ.",
  noEmail: "Địa chỉ email chưa được điền.",
  noPassword: "Mật khẩu chưa được điền.",
  noFullName: "Họ tên chưa được điền.",
  noSchoolName: "Trường chưa được điền.",
  noAddress: "Địa chỉ chưa được điền.",
  noCulturalLeveling: "Trình độ chưa được điền.",
  noYearsOfExperience: "Kinh nghiệm chưa được điền.",
  invalidPhoneNumber: "Số điện thoại không hợp lệ.",
  minLengthPassword: "Mật khẩu phải có ít nhất 6 ký tự.",
  noConfirmPassword: "Mật khẩu xác nhận chưa được điền.",
  noCorrectPassword: "Mật khẩu xác nhận không trùng khớp.",
  noPosition: "Vị trí chưa được điền.",
};

export enum AuthMode {
  signIn = "sign-in",
  signUp = "sign-up",
}

export const emailValidation = Yup.string()
  .matches(emailRegex, AUTH_ERRORS.invalidEmail)
  .required(AUTH_ERRORS.noEmail);

//Update Info
export const fullNameValidation = Yup.string().required(AUTH_ERRORS.noFullName);
export const schoolNameValidation = Yup.string().required(
  AUTH_ERRORS.noSchoolName
);
export const addressValidation = Yup.string().required(AUTH_ERRORS.noAddress);

export const phoneNumberValidation = Yup.string().when("isPhoneNumber", {
  is: true,
  then: (schema) => schema.matches(phoneRegExp, AUTH_ERRORS.invalidPhoneNumber),
});
export const culturalLevelingValidation = Yup.string().required(
  AUTH_ERRORS.noCulturalLeveling
);
export const yearsOfExperienceValidation = Yup.string().required(
  AUTH_ERRORS.noYearsOfExperience
);
export const positionValidation = Yup.string().required(AUTH_ERRORS.noPosition);
//Update Info

//Change Password
export const passwordValidation = Yup.string()
  .required(AUTH_ERRORS.noPassword)
  .min(6, AUTH_ERRORS.minLengthPassword);
export const oldPasswordValidation = Yup.string().required(
  AUTH_ERRORS.noPassword
);
export const rePasswordValidation = Yup.string()
  .required(AUTH_ERRORS.noConfirmPassword)
  .oneOf([Yup.ref("password")], AUTH_ERRORS.noCorrectPassword);
//Change Password

export const signInFormValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpFormValidationSchema = Yup.object().shape({
  fullName: fullNameValidation,
  schoolName: schoolNameValidation,
  address: addressValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const studentInfoFormValidationSchema = Yup.object().shape({
  fullName: fullNameValidation,
  schoolName: schoolNameValidation,
  address: addressValidation,
  isPhoneNumber: Yup.boolean(),
  phoneNumber: phoneNumberValidation,
});

export const teacherInfoFormValidationSchema = Yup.object().shape({
  fullName: fullNameValidation,
  culturalLeveling: culturalLevelingValidation,
  yearsOfExperience: yearsOfExperienceValidation,
  isPhoneNumber: Yup.boolean(),
  phoneNumber: phoneNumberValidation,
});

export const baseInfoFormValidationSchema = Yup.object().shape({
  fullName: fullNameValidation,
  isPhoneNumber: Yup.boolean(),
  phoneNumber: phoneNumberValidation,
});

export const changePasswordFormValidationSchema = Yup.object().shape({
  oldPassword: oldPasswordValidation,
  password: passwordValidation,
  rePassword: rePasswordValidation,
});

export const registerFormValidationSchema = Yup.object().shape({
  email: emailValidation,
  fullName: fullNameValidation,
  culturalLeveling: culturalLevelingValidation,
  yearsOfExperience: yearsOfExperienceValidation,
  isPhoneNumber: Yup.boolean(),
  phoneNumber: phoneNumberValidation,
  position: positionValidation,
});

export const CustomErrorCodes = {
  EMAIL_ALREADY_EXISTS: "auth/email-already-exists",
  INVALID_LOGIN_CREDENTIALS: "auth/invalid-login-credentials",
  TOO_MANY_REQUESTS: "auth/too-many-requests",
};
