import { IBaseUser } from "@/types/user";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { User } from "firebase/auth";

export const converUserRecordToBaseUser = (
  user: UserRecord,
  isPrivate: boolean
): IBaseUser => {
  return {
    uid: user.uid,
    email: user.email ?? null,
    fullName: user.customClaims?.fullName ?? null,
    role: user.customClaims?.role ?? null,
    disabled: user.disabled,
    emailVerified: user.emailVerified,
    displayName: user.displayName ?? null,
    phoneNumber: user.customClaims?.phoneNumber ?? null,
    photoURL: user.photoURL ?? null,
    className: user.customClaims?.className ?? null,
    schoolName: user.customClaims?.schoolName ?? null,
    address: user.customClaims?.address ?? null,
    birthday: user.customClaims?.birthday ?? null,
    culturalLeveling: user.customClaims?.culturalLeveling ?? null,
    position: user.customClaims?.position ?? null,
    yearsOfExperience: user.customClaims?.yearsOfExperience ?? null,
    otp: isPrivate == true ? user.customClaims?.otp : null,
    otpCreatedAt: isPrivate == true ? user.customClaims?.otpCreatedAt : null,
  };
};

export const converUserToBaseUser = async (user: User): Promise<IBaseUser> => {
  const customClaims = (await user.getIdTokenResult()).claims;

  return {
    uid: user.uid,
    email: user.email ?? null,
    emailVerified: user.emailVerified,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    fullName: customClaims?.fullName ?? null,
    role: customClaims?.role ?? null,
    phoneNumber: customClaims?.phoneNumber ?? null,
    className: customClaims?.className ?? null,
    schoolName: customClaims?.schoolName ?? null,
    address: customClaims?.address ?? null,
    birthday: customClaims?.birthday ?? null,
    culturalLeveling: customClaims?.culturalLeveling ?? null,
    position: customClaims?.position ?? null,
    yearsOfExperience: customClaims?.yearsOfExperience ?? null,
  };
};
