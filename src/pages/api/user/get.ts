import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IBaseAuthReq } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { BaseResponseMessageError, BaseResponseSuccess } from "@/models/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const admin = getAdmin();
      const { currid }: IBaseAuthReq = req.query as any;

      if (!currid) {
        return res.status(403).json(new PermissionError().toModel());
      }

      const user = await UserHandles.getBaseUser(admin, currid);

      return res.status(200).json(BaseResponseSuccess(user));
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Lấy dữ liệu không thành công"));
  }
}
