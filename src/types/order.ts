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
  paymentMethod: IPaymentMethod;
  screenshotUrl?: string;
}

export type INewOrder = Omit<IOrder, "id"> & {
  screenshot?: File;
};

export type IPaymentMethod = "VCB" | "Momo";
