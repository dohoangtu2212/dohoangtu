import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IDisableUsers, IBaseAuthReq, IDeleteUsers } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { BaseResponseMessageError, BaseResponseSuccess } from "@/models/common";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

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

      let allUsers: UserRecord[] = [];
      let nextPageToken;

      do {
        const listUsersResult = await admin
          .auth()
          .listUsers(1000, nextPageToken);
        allUsers = allUsers.concat(listUsersResult.users);
        nextPageToken = listUsersResult.pageToken;
      } while (nextPageToken);

      for (let index = 0; index < allUsers.length; index++) {
        const uid = allUsers[index].uid;
        const resUser = await UserHandles.getUser(admin, uid);

        await admin.auth().updateUser(uid, {
          ...resUser,
          emailVerified: true,
        });
      }

      return res
        .status(200)
        .json(
          BaseResponseSuccess({ message: "Cập nhật tài khoản thành công" })
        );
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Cập nhật tài khoản không thành công"));
  }
}
