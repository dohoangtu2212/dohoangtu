import type { INavigator } from "@/types/navigator";
import { ROUTE } from "@/constants/route";
import { MdHome } from "react-icons/md";

export const NAVIGATOR: { [key: string]: INavigator } = {
  home: {
    id: "home",
    name: "dohoangtu",
    link: ROUTE.home,
    Icon: MdHome,
  },
  store: {
    id: "store",
    name: "Cửa hàng",
    link: ROUTE.store,
  },
  features: {
    id: "features",
    name: "Tính năng",
    link: ROUTE.features,
  },
  contact: {
    id: "contact",
    name: "Liên hệ",
    link: ROUTE.contact,
  },
  cart: {
    id: "cart",
    name: "Giỏ hàng",
    link: ROUTE.cart,
  },
  // STUDENT
  student: {
    id: "student",
    name: "Học sinh | Trang chủ",
    link: ROUTE.studentHome,
  },
  studentCourses: {
    id: "student-courses",
    name: "Khoá học",
    link: ROUTE.studentCourses,
  },
  // TEACHER
  teacher: {
    id: "teacher",
    name: "Giáo viên | Trang chủ",
    link: ROUTE.teacherHome,
  },
  teacherCourses: {
    id: "teacher-courses",
    name: "Khoá học",
    link: ROUTE.teacherCourses,
  },
  teacherOrders: {
    id: "teacher-orders",
    name: "Đơn hàng",
    link: ROUTE.teacherOrders,
  },
};
export const NAVIGATORS = Object.values(NAVIGATOR);

export const PUBLIC_NAVIGATORS: INavigator[] = [
  NAVIGATOR.home,
  NAVIGATOR.store,
  NAVIGATOR.features,
  NAVIGATOR.contact,
  // {
  //   id: "books",
  //   name: "Sách",
  //   link: ROUTE.books,
  //   isPrivate: false,
  // },
  // {
  //   id: "documents",
  //   name: "Tài liệu",
  //   link: ROUTE.documents,
  //   isPrivate: false,
  // },
];

export const STUDENT_NAVIGATORS: INavigator[] = [
  NAVIGATOR.home,
  NAVIGATOR.store,
  NAVIGATOR.student,
  NAVIGATOR.studentCourses,
];

export const TEACHER_NAVIGATORS: INavigator[] = [
  NAVIGATOR.home,
  NAVIGATOR.teacherCourses,
  NAVIGATOR.teacherOrders,
];
