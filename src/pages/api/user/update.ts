import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { ActionEditUser, IBaseAuthReq, IEditUser } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { BaseResponseMessageError, BaseResponseSuccess } from "@/models/common";
import mailService from "@/service/mail.service";
import dayjs from "dayjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const admin = getAdmin();
      const body: IEditUser & IBaseAuthReq = req.body as any;

      if (
        !body.currid ||
        (await UserHandles.checkPermission(admin, body.currid))
      ) {
        return res.status(403).json(new PermissionError().toModel());
      }

      const resUser = await UserHandles.getUser(admin, body.uid);

      const resUpdate = await admin.auth().updateUser(body.uid, {
        ...resUser,
        ...(body.hasOwnProperty("email") && { email: body.email }),
        ...(body.hasOwnProperty("photoURL") && { photoURL: body.photoURL }),
        ...(body.hasOwnProperty("emailVerified") && {
          emailVerified: body.emailVerified,
        }),
        ...(body.hasOwnProperty("disabled") && { disabled: body.disabled }),
      });

      if (!resUpdate) {
        return res
          .status(500)
          .json({ message: "Cập nhật tài khoản không thành công" });
      }

      await admin.auth().setCustomUserClaims(resUpdate.uid, {
        ...resUpdate.customClaims,
        ...(body.hasOwnProperty("phoneNumber") && {
          phoneNumber: body.phoneNumber,
        }),
        ...(body.hasOwnProperty("role") && { role: body.role }),
        ...(body.hasOwnProperty("birthday") && { birthday: body.birthday }),
        ...(body.hasOwnProperty("address") && { address: body.address }),
        ...(body.hasOwnProperty("fullName") && { fullName: body.fullName }),
        ...(body.hasOwnProperty("className") && { className: body.className }),
        ...(body.hasOwnProperty("schoolName") && {
          schoolName: body.schoolName,
        }),
        ...(body.hasOwnProperty("position") && {
          position: body.position,
        }),
        ...(body.hasOwnProperty("culturalLeveling") && {
          culturalLeveling: body.culturalLeveling,
        }),
        ...(body.hasOwnProperty("yearsOfExperience") && {
          yearsOfExperience: body.yearsOfExperience,
        }),
        ...(body.hasOwnProperty("otp") && {
          otp: body.otp,
        }),
        ...(body.hasOwnProperty("otpCreatedAt") && {
          otpCreatedAt: body.otpCreatedAt,
        }),
      });

      const resResult = await UserHandles.getBaseUser(admin, resUpdate.uid);

      return res.status(200).json(BaseResponseSuccess(resResult));
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Cập nhật tài khoản không thành công"));
  }
}
