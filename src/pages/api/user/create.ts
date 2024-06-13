import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import {
  CreateUserCustom,
  CreateUserCustomClaims,
  IBaseAuthReq,
  ICreateUser,
} from "@/types/user";
import { UserRole } from "@/types/permission";
import { PermissionError } from "@/utils/error";
import { converUserRecordToBaseUser } from "@/utils/convertModel";
import { BaseResponseError, BaseResponseSuccess } from "@/models/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const admin = getAdmin();
      const body: ICreateUser & IBaseAuthReq = req.body as any;

      if (!body.currid) {
        return res.status(403).json(new PermissionError().toModel());
      }

      if (!body.email || !body.password || !body.role) {
        return res
          .status(500)
          .json({ message: "email, password, role is required" });
      }

      const user = await admin.auth().getUser(body.currid);
      if (user.customClaims?.role !== UserRole.admin) {
        return res.status(403).json(new PermissionError().toModel());
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
          .status(500)
          .json({ message: "Tạo tài khoản không thành công" });
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
      } as CreateUserCustomClaims);

      const resUser = await admin.auth().getUser(resCreate.uid);
      const resData = converUserRecordToBaseUser(resUser, true);

      return res.status(200).json(BaseResponseSuccess(resData));
    }
  } catch (err: any) {
    return res.status(200).json(BaseResponseError(err));
  }
}
