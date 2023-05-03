import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRole } from "@/types/permission";

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
  }),
});

export const { useUpdateUserRoleMutation } = userApis;
export default userApis;
