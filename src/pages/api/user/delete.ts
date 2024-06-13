import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IBaseAuthReq, IDeleteUser } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { BaseResponseMessageError, BaseResponseSuccess } from "@/models/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const admin = getAdmin();
      const body: IDeleteUser & IBaseAuthReq = req.body as any;

      if (
        !body.currid ||
        (await UserHandles.checkPermission(admin, body.currid))
      ) {
        return res.status(403).json(new PermissionError().toModel());
      }

      admin.auth().deleteUser(body.uid);

      return res
        .status(200)
        .json(BaseResponseSuccess({ message: "Xoá tài khoản thành công" }));
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Xoá tài khoản không thành công"));
  }
}
