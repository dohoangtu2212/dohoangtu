import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateUser } from "@/types/user";
import { IBaseResponse } from "@/models/common";

const TAG = {};

const AuthApis = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    registerUser: build.mutation<
      IBaseResponse<{ message: string }>,
      ICreateUser
    >({
      query: (record) => {
        return {
          url: "/register",
          method: "POST",
          body: record,
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation } = AuthApis;
export default AuthApis;
