import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRole } from "@/types/permission";
import { IBaseUser, ICreateUser, IBaseAuthReq } from "@/types/user";
import { IBasePagingRes, IBaseResponse } from "@/models/common";
import {
  IRegisterTeacherRes,
  IGetRegisterTeacherPagingReq,
  IDeleteRegisterTeachers,
  IApproveRegisterTeachers,
  ISeenRegisterTeachers,
  IRegisterTeacherReq,
} from "@/types/registerTeacher";

const TAG = {};

const registerTeacherApis = createApi({
  reducerPath: "register-teacher-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/register-teacher",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getTeacherRegisters: build.mutation<
      IBaseResponse<IBasePagingRes<IRegisterTeacherRes>>,
      IGetRegisterTeacherPagingReq & IBaseAuthReq
    >({
      query: (record) => {
        return {
          url: "/gets",
          method: "GET",
          params: record,
        };
      },
    }),
    deleteTeacherRegisters: build.mutation<
      IBaseResponse<{ message: string }>,
      IDeleteRegisterTeachers & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/deletes",
        method: "POST",
        body: record,
      }),
    }),
    seenTeacherRegisters: build.mutation<
      IBaseResponse<{ message: string }>,
      ISeenRegisterTeachers & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/seens",
        method: "PUT",
        body: record,
      }),
    }),
    approveTeacherRegisters: build.mutation<
      IBaseResponse<{ message: string }>,
      IApproveRegisterTeachers & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/approve",
        method: "POST",
        body: record,
      }),
    }),
    createTeacherRegister: build.mutation<
      IBaseResponse<null>,
      IRegisterTeacherReq
    >({
      query: (record) => ({
        url: "/create",
        method: "POST",
        body: record,
      }),
    }),
  }),
});

export const {
  useGetTeacherRegistersMutation,
  useDeleteTeacherRegistersMutation,
  useSeenTeacherRegistersMutation,
  useApproveTeacherRegistersMutation,
  useCreateTeacherRegisterMutation,
} = registerTeacherApis;
export default registerTeacherApis;
