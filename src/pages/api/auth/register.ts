// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import {
  CreateUserCustom,
  CreateUserCustomClaims,
  ICreateUser,
} from "@/types/user";
import {
  BaseResponseError,
  BaseResponseMessageError,
  BaseResponseSuccess,
} from "@/models/common";
import { UserRole } from "@/types/permission";
import dayjs from "dayjs";
import { UserHandles } from "@/utils/user.handles";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const admin = getAdmin();
      const body: ICreateUser = req.body as any;

      if (!body.email || !body.password || !body.role) {
        return res
          .status(500)
          .json({ message: "email, password, role is required" });
      }

      const resCreate = await admin.auth().createUser({
        email: body.email,
        password: body.password,
        photoURL: body.photoURL,
        disabled: false,
        emailVerified: body.emailVerified,
      } as CreateUserCustom);

      if (!resCreate) {
        return res
          .status(200)
          .json(BaseResponseMessageError("Tạo tài khoản không thành công"));
      }

      if (body.role == UserRole.student && !body.emailVerified) {
        body.otp = Math.floor(100000 + Math.random() * 900000).toString();
        body.otpCreatedAt = dayjs().toString();

        try {
          UserHandles.sendMailActive(body.otp, body.email, body.fullName);
        } catch (error) {
          console.error(error);
        }
      }

      await admin.auth().setCustomUserClaims(resCreate.uid, {
        phoneNumber: body.phoneNumber,
        role: body.role,
        birthday: body.birthday,
        address: body.address,
        fullName: body.fullName,
        className: body.className,
        schoolName: body.schoolName,
        position: body.position,
        culturalLeveling: body.culturalLeveling,
        yearsOfExperience: body.yearsOfExperience,
        otp: body.otp,
        otpCreatedAt: body.otpCreatedAt,
      } as CreateUserCustomClaims);

      return res
        .status(200)
        .json(BaseResponseSuccess({ message: "Tạo tài khoản thành công" }));
    }
  } catch (err: any) {
    return res.status(500).json(BaseResponseError(err));
  }
}
