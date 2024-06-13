import type { NextApiRequest, NextApiResponse } from "next";
import { getAdmin } from "@/utils/firebase-admin";
import { IBaseAuthReq } from "@/types/user";
import { PermissionError } from "@/utils/error";
import {
  BaseResponseMessageError,
  BaseResponseSuccess,
  IBasePagingRes,
} from "@/models/common";
import { UserHandles } from "@/utils/user.handles";
import {
  child,
  equalTo,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { DB_KEY } from "@/store/apis/db";
import {
  IGetRegisterTeacherPagingReq,
  IRegisterTeacherRes,
} from "@/types/registerTeacher";

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
        keyword = "",
        currid,
        type,
      }: IGetRegisterTeacherPagingReq & IBaseAuthReq = req.query as any;

      if (!currid || (await UserHandles.checkPermission(admin, currid))) {
        return res.status(403).json(new PermissionError().toModel());
      }
      const db = getDatabase();
      const dbRef = ref(db);

      const startIndex = (pageIndex - 1) * pageSize;
      const limit = Number(startIndex) + Number(pageSize);

      let queryConstraint = query(child(dbRef, `${DB_KEY.registerTeacher}`));
      if (type && limit && !keyword) {
        queryConstraint = query(
          queryConstraint,
          orderByChild("positionType"),
          equalTo(type)
        );
        queryConstraint = query(queryConstraint, limitToLast(limit));
      } else if (type) {
        queryConstraint = query(
          queryConstraint,
          orderByChild("positionType"),
          equalTo(type)
        );
      }

      const snapshot = await get(queryConstraint);
      if (snapshot.exists()) {
        let result = Object.entries(snapshot.val()).map(([key, val]) => ({
          id: key,
          ...(val as any),
        })) as IRegisterTeacherRes[];

        result = result.reverse();
        result = result.filter((item) => {
          let nameMatch = true; // Mặc định là true nếu nameQuery không được cung cấp
          let emailMatch = true;
          let culturalLevelingMatch = true;

          if (keyword) {
            nameMatch = item.fullName
              .toLowerCase()
              .includes(keyword.toLowerCase());

            emailMatch = item.email
              .toLowerCase()
              .includes(keyword.toLowerCase());

            culturalLevelingMatch = item.culturalLeveling
              .toLowerCase()
              .includes(keyword.toLowerCase());
          }

          return nameMatch || emailMatch || culturalLevelingMatch;
        });

        const pagination = result.slice(startIndex, limit);

        const resData: IBasePagingRes<IRegisterTeacherRes> = {
          items: pagination,
          page: pageIndex,
          pageSize: pageSize,
          total: result.length,
          totalPage: Math.ceil(result.length / pageSize),
        };

        return res.status(200).json(BaseResponseSuccess(resData));
      }
      return res.status(200).json(
        BaseResponseSuccess({
          items: [],
          page: pageIndex,
          pageSize: pageSize,
          total: 0,
          totalPage: 1,
        })
      );
    }
  } catch (err) {
    console.log("err: ", err);
    return res
      .status(200)
      .json(BaseResponseMessageError("Lấy dữ liệu không thành công"));
  }
}
