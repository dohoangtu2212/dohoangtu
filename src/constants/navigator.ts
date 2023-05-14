import type { INavigator } from "@/types/navigator";
import { ROUTE } from "@/constants/route";

export const NAVIGATOR: { [key: string]: INavigator } = {
  home: {
    id: "home",
    name: "Trang chủ",
    link: ROUTE.home,
    isPrivate: false,
  },
  store: {
    id: "store",
    name: "Cửa hàng",
    link: ROUTE.store,
    isPrivate: false,
  },
  features: {
    id: "features",
    name: "Tính năng",
    link: ROUTE.features,
    isPrivate: false,
  },
  contact: {
    id: "contact",
    name: "Liên hệ",
    link: ROUTE.contact,
    isPrivate: false,
  },
  cart: {
    id: "cart",
    name: "Giỏ hàng",
    link: ROUTE.cart,
    isPrivate: false,
  },
  // STUDENT
  student: {
    id: "student",
    name: "Học sinh | Trang chủ",
    link: ROUTE.studentHome,
    isPrivate: false,
  },
  studentCourses: {
    id: "student-courses",
    name: "Khoá học",
    link: ROUTE.studentCourses,
    isPrivate: false,
  },
  // TEACHER
  teacher: {
    id: "teacher",
    name: "Giáo viên | Trang chủ",
    link: ROUTE.teacherHome,
    isPrivate: false,
  },
  teacherCourses: {
    id: "teacher-courses",
    name: "Khoá học",
    link: ROUTE.teacherCourses,
    isPrivate: false,
  },
  teacherOrders: {
    id: "teacher-orders",
    name: "Đơn hàng",
    link: ROUTE.teacherOrders,
    isPrivate: false,
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
