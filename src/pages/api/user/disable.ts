import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IDisableUsers, IBaseAuthReq, IDeleteUsers } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { BaseResponseMessageError, BaseResponseSuccess } from "@/models/common";
import { UpdateRequest } from "firebase-admin/lib/auth/auth-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const admin = getAdmin();
      const body: IDisableUsers & IBaseAuthReq = req.body as any;

      if (
        !body.currid ||
        (await UserHandles.checkPermission(admin, body.currid))
      ) {
        return res.status(403).json(new PermissionError().toModel());
      }

      for (let index = 0; index < body.users.length; index++) {
        const user = body.users[index];
        const updateRequest: UpdateRequest = {
          ...(body.hasOwnProperty("email") && { email: user.email ?? "" }),
          ...(body.hasOwnProperty("role") && { role: user.role }),
          ...(body.hasOwnProperty("photoURL") && { photoURL: user.photoURL }),
          ...(body.hasOwnProperty("emailVerified") && {
            emailVerified: user.emailVerified,
          }),
          ...(body.hasOwnProperty("disabled") && { disabled: body.disabled }),
        };
        await admin.auth().updateUser(user.uid, {
          ...updateRequest,
        });
      }

      return res
        .status(200)
        .json(
          BaseResponseSuccess({ message: "Cập nhật tài khoản thành công" })
        );
    }
  } catch (err) {
    console.log("err: ", err);
    return res
      .status(200)
      .json(BaseResponseMessageError("Cập nhật tài khoản không thành công"));
  }
}
