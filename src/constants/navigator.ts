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
    name: "Khoá học",
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
  registerTeacher: {
    id: "register-teacher",
    name: "Đăng ký giáo viên",
    link: ROUTE.registerTeacher,
  },
  // ALL USERS
  accountActivation: {
    id: "account-activation",
    name: "Kích hoạt tài khoản",
    link: ROUTE.accountActivation,
  },
  // STUDENT
  student: {
    id: "student",
    name: "Học sinh | Trang chủ",
    link: ROUTE.studentHome,
  },
  studentCourses: {
    id: "student-courses",
    name: "Khoá học của tôi",
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
    name: "Quản lý khoá học",
    link: ROUTE.teacherCourses,
  },
  teacherOrders: {
    id: "teacher-orders",
    name: "Đơn hàng",
    link: ROUTE.teacherOrders,
  },
  // ADMIN
  adminManageAccount: {
    id: "admin-manage-account",
    name: "Quản lý tài khoản",
    link: ROUTE.adminManageAccount,
  },
  adminManageTeachers: {
    id: "admin-manage-teachers",
    name: "Quản lý giáo viên",
    link: ROUTE.adminManageTeachers,
  },
  adminManagePage: {
    id: "admin-manage-page",
    name: "Quản lý trang chủ",
    link: ROUTE.adminManagePage,
  },
};
export const NAVIGATORS = Object.values(NAVIGATOR);

export const PUBLIC_NAVIGATORS: INavigator[] = [
  NAVIGATOR.home,
  NAVIGATOR.store,
  // NAVIGATOR.features,
  NAVIGATOR.contact,
  NAVIGATOR.registerTeacher,
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
  // NAVIGATOR.student,
  NAVIGATOR.studentCourses,
];

export const TEACHER_NAVIGATORS: INavigator[] = [
  NAVIGATOR.teacherCourses,
  NAVIGATOR.teacherOrders,
];

export const ADMIN_NAVIGATORS: INavigator[] = [
  NAVIGATOR.adminManageAccount,
  NAVIGATOR.adminManageTeachers,
  NAVIGATOR.adminManagePage,
];
