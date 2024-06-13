import type { NextApiRequest, NextApiResponse } from "next";
import { child, getDatabase, push, ref, update } from "firebase/database";
import { DB_KEY, Updates } from "@/store/apis/db";
import dayjs from "dayjs";
import { EApproveStatus, IRegisterTeacherReq } from "@/types/registerTeacher";
import { BaseResponseError, BaseResponseSuccess } from "@/models/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const body: IRegisterTeacherReq = req.body as any;
      const db = getDatabase();

      const createData = {
        ...body,
        status: EApproveStatus.UnSeen,
        createdAt: dayjs().toString(),
        updateAt: dayjs().toString(),
      };

      const newKey = push(child(ref(db), DB_KEY.registerTeacher)).key;
      const updates: Updates = {};
      updates[`/${DB_KEY.registerTeacher}/` + newKey] = createData;
      await update(ref(db), updates);

      const resData = { data: { id: newKey as string } };
      return res.status(200).json(BaseResponseSuccess(resData));
    }
  } catch (err: any) {
    return res.status(200).json(BaseResponseError(err));
  }
}
