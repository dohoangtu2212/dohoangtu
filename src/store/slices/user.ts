import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { UserRole } from "@/types/permission";
import { IBaseUser } from "@/types/user";

export interface UserState {
  currentUser: IBaseUser | null;
  userRole: UserRole | null;
}

const initialState: UserState = {
  currentUser: null,
  userRole: null,
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
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
export const useCurrentUserSelector = () =>
  useSelector((state: RootState) => state.user.currentUser);
export const useUserRoleSelector = () =>
  useSelector((state: RootState) => state.user.userRole);
