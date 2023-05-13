import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { UserRole } from "@/types/permission";

export interface UserState {
  currentUser: FirebaseUser | null;
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
    setCurrentUser: (state, action: PayloadAction<FirebaseUser | null>) => {
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
