import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import {
  ActionEditUser,
  IBaseAuthReq,
  ICheckActivationReq,
  IEditUser,
} from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { BaseResponseMessageError, BaseResponseSuccess } from "@/models/common";
import dayjs from "dayjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const admin = getAdmin();
      const body: ICheckActivationReq & IBaseAuthReq = req.query as any;

      if (!body.currid) {
        return res.status(403).json(new PermissionError().toModel());
      }

      const resUser = await UserHandles.getBaseUser(admin, body.currid);

      if (!resUser) {
        return res.status(403).json(new PermissionError().toModel());
      }

      let result = false;
      if (body.otp == resUser.otp && resUser.otpCreatedAt) {
        const date1 = dayjs(resUser.otpCreatedAt);
        const date2 = dayjs(dayjs().toString());
        const diff = date1.diff(date2, "day");
        if (diff <= 1) {
          result = true;
        }
      }

      return res.status(200).json(BaseResponseSuccess(result));
    }
  } catch (err) {
    console.log("err: ", err);
    return res
      .status(200)
      .json(BaseResponseMessageError("Cập nhật tài khoản không thành công"));
  }
}
