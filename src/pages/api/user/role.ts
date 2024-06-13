import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { UserRole } from "@/types/permission";

interface IPatchBody {
  phone?: string;
  email?: string;
  role: UserRole;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const admin = getAdmin();

    const body = req.body;
    const { phone, email, role } = body as IPatchBody;
    if ((!phone && !email) || !role)
      return res.status(400).json({ msg: "Bad request." });
    if (!!phone) {
      const user = await admin.auth().getUserByPhoneNumber(phone);
      if (!user) return res.status(404).json({ msg: "User not found." });
      await admin.auth().setCustomUserClaims(user.uid, { role: role });
      return res.status(200).end();
    }
    if (!!email) {
      const user = await admin.auth().getUserByEmail(email);
      if (!user) return res.status(404).json({ msg: "User not found." });
      await admin.auth().setCustomUserClaims(user.uid, { role: role });
      return res.status(200).end();
    }
    return res.status(404).json({ msg: "Bad request." });
  }

  return res.status(404).end();
}
