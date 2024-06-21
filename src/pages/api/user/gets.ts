import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IBaseAuthReq, IBaseUser } from "@/types/user";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { UserRole } from "@/types/permission";
import { PermissionError } from "@/utils/error";
import { converUserRecordToBaseUser } from "@/utils/convertModel";
import { INITAL_BASE_PAGING } from "@/constants/api";
import { IGetPagingReq } from "@/models/user";
import {
  BaseResponseMessageError,
  BaseResponseSuccess,
  IBasePagingRes,
} from "@/models/common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const admin = getAdmin();
      const {
        pageIndex = 1,
        pageSize = 10,
        keyword,
        role,
        currid,
      }: IGetPagingReq & IBaseAuthReq = req.query as any;

      if (!currid) {
        return res.status(403).json(new PermissionError().toModel());
      }

      const user = await admin.auth().getUser(currid);
      if (user.customClaims?.role !== UserRole.admin) {
        return res.status(403).json(new PermissionError().toModel());
      }

      let allUsers: UserRecord[] = [];
      let nextPageToken;

      // Lấy tất cả người dùng
      do {
        const listUsersResult = await admin
          .auth()
          .listUsers(1000, nextPageToken);
        allUsers = allUsers.concat(listUsersResult.users);
        nextPageToken = listUsersResult.pageToken;
      } while (nextPageToken);

      allUsers.sort(function (a, b) {
        return (
          Date.parse(b.metadata.creationTime) -
          Date.parse(a.metadata.creationTime)
        );
      });

      let filteredUsers = allUsers.filter((user) => {
        let nameMatch = true; // Mặc định là true nếu nameQuery không được cung cấp
        let matchRole = true; // Mặc định là true nếu roleQuery không được cung cấp
        let emailMatch = true;

        if (keyword) {
          nameMatch =
            user.customClaims && user.customClaims.name
              ? user.customClaims.name
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              : false;

          emailMatch = user.email
            ? !!user.email.toLowerCase().match(keyword.toLowerCase())
            : false;
        }

        if (role) {
          matchRole =
            user.customClaims && user.customClaims.role
              ? user.customClaims.role === role
              : false;
        }

        return (nameMatch || emailMatch) && matchRole;
      });

      // Phân trang
      const startIndex = (pageIndex - 1) * pageSize;
      const limit = Number(startIndex) + Number(pageSize);
      const paginatedUsers = filteredUsers.slice(startIndex, limit);

      if (!paginatedUsers) return res.status(200).json(INITAL_BASE_PAGING);

      const resData: IBasePagingRes<IBaseUser> = {
        items: paginatedUsers.map((user) =>
          converUserRecordToBaseUser(user, false)
        ),
        page: pageIndex,
        pageSize: pageSize,
        total: filteredUsers.length,
        totalPage: Math.ceil(filteredUsers.length / pageSize),
      };

      return res.status(200).json(BaseResponseSuccess(resData));
    }
  } catch (err) {
    return res
      .status(200)
      .json(BaseResponseMessageError("Lấy dữ liệu không thành công"));
  }
}
