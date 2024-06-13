import { IBasePagingReq } from "@/models/common";
import { UserRole } from "./permission";
import { EPositionType } from "./registerTeacher";

export interface IBaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  disabled?: boolean;
  emailVerified?: boolean;
  // customClaims
  phoneNumber?: string | null;
  role: UserRole;
  birthday?: Date | null;
  address?: string | null;
  fullName?: string | null;
  // roleStudent
  className?: string | null;
  schoolName?: string | null;
  // roleTeacher
  position?: string | null;
  culturalLeveling?: string | null;
  yearsOfExperience?: number | null;
  otp?: string | null;
  otpCreatedAt?: string | null;
}

export interface CreateUserCustom {
  email?: string;
  disabled?: boolean;
  emailVerified?: boolean;
  password?: string;
  photoURL?: string;
}

export interface CreateUserCustomClaims {
  // customClaims
  phoneNumber?: string | null;
  role?: UserRole | null;
  birthday?: Date | null;
  address?: string | null;
  fullName?: string | null;
  // roleStudent
  className?: string | null;
  schoolName?: string | null;
  // roleTeacher
  position?: string | null;
  positionType?: EPositionType | null;
  culturalLeveling?: string | null;
  yearsOfExperience?: number | null;
}

export interface ITeacher extends IBaseUser {}

export interface IStudent extends IBaseUser {}

export interface IGetUsers extends IBasePagingReq {
  role?: UserRole;
}

export interface IBaseAuthReq {
  currid: string;
}

export interface ICreateUser {
  email: string | null;
  role: UserRole;
  photoURL?: string | null;
  phoneNumber?: string | null;
  birthday?: Date | null;
  address?: string | null;
  fullName?: string | null;
  className?: string | null;
  schoolName?: string | null;
  position?: string | null;
  culturalLeveling?: string | null;
  yearsOfExperience?: number | null;
  password?: string | null;
  emailVerified?: boolean;
  otp?: string | null;
  otpCreatedAt?: string | null;
}

export interface IEditUser {
  uid: string;
  email?: string | null;
  photoURL?: string | null;
  role?: UserRole;
  phoneNumber?: string | null;
  birthday?: Date | null;
  address?: string | null;
  fullName?: string | null;
  className?: string | null;
  schoolName?: string | null;
  position?: string | null;
  culturalLeveling?: string | null;
  yearsOfExperience?: number | null;
  emailVerified?: boolean;
  disabled?: boolean;
  otp?: string | null;
  otpCreatedAt?: string | null;
  action?: ActionEditUser;
}

export enum ActionEditUser {
  reSendMail,
  updateInfo,
}

export interface IDeleteUser {
  uid: string;
}

export interface IDeleteUsers {
  uids: string[];
}

export interface IDisableUsers {
  users: IBaseUser[];
  disabled: boolean;
}

export interface ICheckActivationReq {
  otp: string;
}
