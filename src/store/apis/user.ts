import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRole } from "@/types/permission";
import {
  IBaseUser,
  ICreateUser,
  IBaseAuthReq,
  IDisableUsers,
  IEditUser,
  IDeleteUser,
  IDeleteUsers,
  ICheckActivationReq,
} from "@/types/user";
import { IBasePagingRes, IBaseResponse } from "@/models/common";
import { IGetPagingReq } from "@/models/user";

const userApis = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    updateUserRole: build.mutation<
      unknown,
      { email?: string; phone?: string; role: UserRole }
    >({
      query: ({ email, phone, role }) => {
        return {
          url: "/role",
          method: "PATCH",
          body: {
            email,
            phone,
            role,
          },
        };
      },
    }),
    getUser: build.mutation<IBaseResponse<IBaseUser>, IBaseAuthReq>({
      query: (record) => ({
        url: "/get",
        method: "GET",
        params: record,
      }),
    }),
    getUsers: build.mutation<
      IBaseResponse<IBasePagingRes<IBaseUser>>,
      IGetPagingReq & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/gets",
        method: "GET",
        params: record,
      }),
    }),
    disableUsers: build.mutation<
      IBaseResponse<{ message: string }>,
      IDisableUsers & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/disable",
        method: "PUT",
        body: record,
      }),
    }),
    updateUser: build.mutation<
      IBaseResponse<{ message: string }>,
      IEditUser & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/update",
        method: "PUT",
        body: record,
      }),
    }),
    updateUserInfo: build.mutation<
      IBaseResponse<IBaseUser>,
      IEditUser & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/update-info",
        method: "PUT",
        body: record,
      }),
    }),
    deleteUser: build.mutation<
      IBaseResponse<{ message: string }>,
      IDeleteUser & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/delete",
        method: "POST",
        body: record,
      }),
    }),
    deleteUsers: build.mutation<
      IBaseResponse<{ message: string }>,
      IDeleteUsers & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/deletes",
        method: "POST",
        body: record,
      }),
    }),
    checkActivation: build.mutation<
      IBaseResponse<boolean>,
      ICheckActivationReq & IBaseAuthReq
    >({
      query: (record) => ({
        url: "/check-activation",
        method: "GET",
        params: record,
      }),
    }),
  }),
});

export const {
  useUpdateUserRoleMutation,
  useGetUserMutation,
  useGetUsersMutation,
  useDisableUsersMutation,
  useUpdateUserInfoMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteUsersMutation,
  useCheckActivationMutation,
} = userApis;
export default userApis;
