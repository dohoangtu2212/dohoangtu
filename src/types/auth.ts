import { EPositionType } from "./registerTeacher";

export interface AuthFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  fullName: string;
  schoolName: string;
  address: string;
  email: string;
  password: string;
}

export interface AccountInfoFormValues {
  fullName: string;
  phoneNumber: string;
  isPhoneNumber: boolean;
  schoolName: string;
  className: string;
  address: string;
  culturalLeveling: string;
  yearsOfExperience: number;
}

export interface ChangePasswordFormValues {
  oldPassword: string;
  password: string;
  rePassword: string;
}

export interface RegisterTeacherFormValues {
  email: string;
  fullName: string;
  phoneNumber: string;
  isPhoneNumber: boolean;
  culturalLeveling: string;
  yearsOfExperience: number;
  position: string;
  positionType: EPositionType;
}
