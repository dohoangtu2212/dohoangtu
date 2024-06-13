import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IBaseAuthReq } from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import { child, getDatabase, ref, remove } from "firebase/database";
import { DB_KEY } from "@/store/apis/db";
import { IDeleteRegisterTeachers } from "@/types/registerTeacher";
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
    if (req.method === "POST") {
      const admin = getAdmin();
      const body: IDeleteRegisterTeachers & IBaseAuthReq = req.body as any;

      if (
        !body.currid ||
        (await UserHandles.checkPermission(admin, body.currid))
      ) {
        return res.status(403).json(new PermissionError().toModel());
      }
      const db = getDatabase();
      const dbRef = ref(db);

      for (let index = 0; index < body.uids.length; index++) {
        const uid = body.uids[index];
        const registerTeacherRef = child(
          dbRef,
          `${DB_KEY.registerTeacher}/${uid}`
        );
        await remove(registerTeacherRef);
      }

      return res
        .status(200)
        .json(BaseResponseSuccess({ message: "Xoá giáo viên thành công" }));
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Xoá giáo viên không thành công"));
  }
}
