import { ICourse, IStudentCourse } from "@/types/course";

export interface IOrder {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courses: IStudentCourse[];
  totalPrice: number;
  createdAt: string;
  isConfirmed: boolean;
}

export type INewOrder = Omit<IOrder, "id">;
