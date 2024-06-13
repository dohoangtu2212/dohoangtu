import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IBaseAuthReq } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { getDatabase, ref, set } from "firebase/database";
import { DB_KEY } from "@/store/apis/db";
import { EApproveStatus, ISeenRegisterTeachers } from "@/types/registerTeacher";
import {
  BaseResponseMessageError,
  BaseResponseMessageSuccess,
  BaseResponseSuccess,
} from "@/models/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const admin = getAdmin();
      const body: ISeenRegisterTeachers & IBaseAuthReq = req.body as any;

      if (
        !body.currid ||
        (await UserHandles.checkPermission(admin, body.currid))
      ) {
        return res.status(403).json(new PermissionError().toModel());
      }
      const db = getDatabase();

      for (let index = 0; index < body.uids.length; index++) {
        const uid = body.uids[index];
        await set(
          ref(db, `${DB_KEY.registerTeacher}/${uid}/status`),
          EApproveStatus.Seen
        );
      }

      return res
        .status(200)
        .json(BaseResponseSuccess({ message: "Cập nhật dữ liệu thành công" }));
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Cập nhật dữ liệu không thành công"));
  }
}
