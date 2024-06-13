import { IBasePagingReq } from "@/models/common";

export enum EApproveStatus {
  Seen = "seen",
  UnSeen = "unseen",
  Register = "register",
}

export enum EPositionType {
  Teacher = "teacher",
  Tutors = "tutors",
  Other = "other",
}

export interface IRegisterTeacherReq {
  email: string;
  fullName: string;
  phoneNumber: string;
  culturalLeveling: string;
  yearsOfExperience: number;
  position: string;
  positionType: EPositionType;
}

export interface IRegisterTeacherRes {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  culturalLeveling: string;
  yearsOfExperience: number;
  position: string;
  positionType: EPositionType;
  status: EApproveStatus;
  createdAt: string;
  updateAt: string;
}

export interface IDeleteRegisterTeachers {
  uids: string[];
}

export interface ISeenRegisterTeachers {
  uids: string[];
}

export interface IApproveRegisterTeachers {
  id: string;
}

export interface IGetRegisterTeacherPagingReq extends IBasePagingReq {
  type?: EPositionType;
}
