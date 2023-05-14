import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ICourse } from "@/types/course";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  courses: ICourse[];
  totalPrice: number;
}

const initialState: CartState = {
  courses: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<ICourse>) => {
      const course = action.payload;
      state.courses = [...state.courses, course];
      state.totalPrice = state.totalPrice + course.price;
    },
    removeCourse: (state, action: PayloadAction<ICourse>) => {
      const course = action.payload;
      const newCourses = state.courses.filter((c) => c.id !== course.id);
      state.courses = newCourses;
      state.totalPrice = state.totalPrice - course.price;
    },
    clearCart: (state) => {
      state.courses = [];
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const useCartCoursesSelector = () =>
  useSelector((state: RootState) => state.cart.courses);
export const useCartTotalPriceSelector = () =>
  useSelector((state: RootState) => state.cart.totalPrice);
