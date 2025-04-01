import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IUserPermission, UserRole } from "@/types/permission";
import { IBaseUser } from "@/types/user";

export interface UserState {
  currentUser: IBaseUser | null;
  userRole: UserRole | null;
  userPermission: IUserPermission | null;
  studentCourseIds: string[] | null;
}

const initialState: UserState = {
  currentUser: null,
  userRole: null,
  userPermission: null,
  studentCourseIds: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IBaseUser | null>) => {
      state.currentUser = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRole | null>) => {
      state.userRole = action.payload;
    },
    setUserPermissions: (
      state,
      action: PayloadAction<IUserPermission | null>
    ) => {
      state.userPermission = action.payload;
    },
    setStudentCourseIds: (state, action: PayloadAction<string[] | null>) => {
      state.studentCourseIds = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
export const useCurrentUserSelector = () =>
  useSelector((state: RootState) => state.user.currentUser);
export const useUserRoleSelector = () =>
  useSelector((state: RootState) => state.user.userRole);
export const useUserPermissionSelector = () =>
  useSelector((state: RootState) => state.user.userPermission);
export const useStudentCourseIdsSelector = () =>
  useSelector((state: RootState) => state.user.studentCourseIds);
