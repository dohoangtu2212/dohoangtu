import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ICourseFormValues } from "@/types/course";
import type { PayloadAction } from "@reduxjs/toolkit";

type IEditingCourse = {
  courseId: string;
  courseDetailsId: string;
};
export interface CourseState {
  editingCourse: IEditingCourse | null;
}

const initialState: CourseState = {
  editingCourse: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setEditingCourse: (state, action: PayloadAction<IEditingCourse | null>) => {
      state.editingCourse = action.payload;
    },
  },
});

export const courseActions = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
export const useEditingCourseSelector = () =>
  useSelector((state: RootState) => state.course.editingCourse);
