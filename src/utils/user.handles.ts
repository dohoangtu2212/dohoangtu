import mailService from "@/service/mail.service";
import { UserRole } from "@/types/permission";
import { converUserRecordToBaseUser } from "@/utils/convertModel";

async function getBaseUser(admin: any, uid: string) {
  const res = await admin.auth().getUser(uid);
  return converUserRecordToBaseUser(res, true);
}

async function getUser(admin: any, uid: string) {
  const res = await admin.auth().getUser(uid);
  return res;
}

async function checkPermission(admin: any, uid: string) {
  const resAdmin = await admin.auth().getUser(uid);
  return resAdmin.customClaims?.role !== UserRole.admin;
}

const sendMailActive = (
  otp: string,
  email: string,
  fullName?: string | null
) => {
  const content = `Xin chào ${fullName ?? "bạn"}!<br/><br/>
  Dưới đây là liên kết để bạn kích hoạt tài khoản trên dohoangtu.edu.vn<br/>
  ${process.env.NEXT_PUBLIC_BASE_URL}/account-activation?code=${otp}<br/>
  Trân trọng cảm ơn bạn!`;

  const subject = "Kích hoạt tài khoản";
  mailService.sendEmail(
    email,
    "Kích hoạt tài khoản website dohoangtu.edu.vn",
    content,
    subject
  );
};

export const UserHandles = {
  getUser,
  getBaseUser,
  checkPermission,
  sendMailActive,
};
