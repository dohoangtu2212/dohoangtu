import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import {
  CreateUserCustom,
  CreateUserCustomClaims,
  IBaseAuthReq,
} from "@/types/user";
import { PermissionError } from "@/utils/error";
import { UserHandles } from "@/utils/user.handles";
import mailService from "@/service/mail.service";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { DB_KEY } from "@/store/apis/db";
import {
  EApproveStatus,
  IApproveRegisterTeachers,
  IRegisterTeacherRes,
} from "@/types/registerTeacher";
import { UserRole } from "@/types/permission";
import {
  BaseResponseError,
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
      const body: IApproveRegisterTeachers & IBaseAuthReq = req.body as any;

      if (
        !body.currid ||
        (await UserHandles.checkPermission(admin, body.currid))
      ) {
        return res.status(403).json(new PermissionError().toModel());
      }

      const db = getDatabase();
      const dbRef = ref(db);

      const snapshot = await get(
        child(dbRef, `${DB_KEY.registerTeacher}/${body.id}`)
      );
      if (snapshot.exists()) {
        const data = snapshot.val();
        const resTeacher: IRegisterTeacherRes = { ...data, id: body.id };

        const password = Math.random().toString(36).slice(-8);

        const resCreate = await admin.auth().createUser({
          email: resTeacher.email,
          disabled: false,
          emailVerified: true,
          password: password,
        } as CreateUserCustom);

        if (!resCreate) {
          return res
            .status(500)
            .json(BaseResponseMessageError("Tạo tài khoản không thành công"));
        }

        await admin.auth().setCustomUserClaims(resCreate.uid, {
          phoneNumber: resTeacher.phoneNumber,
          role: UserRole.teacher,
          fullName: resTeacher.fullName,
          position: resTeacher.position,
          positionType: resTeacher.positionType,
          culturalLeveling: resTeacher.culturalLeveling,
          yearsOfExperience: resTeacher.yearsOfExperience,
        } as CreateUserCustomClaims);

        const content = `Xin chào quý thầy/cô!<br/><br/>
        Quý thầy/cô truy cập liên kết này để đăng nhập tài khoản ${resCreate.email}<br/>
        ${process.env.NEXT_PUBLIC_BASE_URL}/auth?mode=sign-in<br/>
        Mật khẩu hiện tài của tài khoản là: <b>${password}</b><br/>
        Vui lòng đăng nhập và đổi mật khẩu mới.<br/><br/>
        Trân trọng cảm ơn quý thầy/cô!`;

        const subject = "Tài khoản đã được duyệt";
        mailService.sendEmail(
          resTeacher.email,
          "Đăng kí tài khoản giáo viên website dohoangtu.edu.vn",
          content,
          subject
        );

        await set(
          ref(db, `${DB_KEY.registerTeacher}/${body.id}/status`),
          EApproveStatus.Register
        );

        return res
          .status(200)
          .json(
            BaseResponseSuccess({ message: "Xét duyệt đăng ký thành công" })
          );
      }
    }
  } catch (err) {
    return res.status(200).json(BaseResponseError(err));
  }
}
