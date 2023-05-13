import type { INavigator } from "@/types/navigator";
import { ROUTE } from "@/constants/route";

export const PUBLIC_NAVIGATORS: INavigator[] = [
  {
    id: "home",
    name: "Trang chủ",
    link: ROUTE.home,
    isPrivate: false,
  },
  // {
  //   id: "books",
  //   name: "Sách",
  //   link: ROUTE.books,
  //   isPrivate: false,
  // },
  {
    id: "courses",
    name: "Cửa hàng",
    link: ROUTE.store,
    isPrivate: false,
  },
  // {
  //   id: "documents",
  //   name: "Tài liệu",
  //   link: ROUTE.documents,
  //   isPrivate: false,
  // },
  {
    id: "features",
    name: "Tính năng",
    link: "/features",
    isPrivate: false,
  },
  {
    id: "contact",
    name: "Liên hệ",
    link: "/contact",
    isPrivate: false,
  },
];

export const STUDENT_NAVIGATORS: INavigator[] = [
  {
    id: "home",
    name: "Trang chủ",
    link: ROUTE.home,
    isPrivate: false,
  },
  {
    id: "student-courses",
    name: "Khoá học",
    link: ROUTE.studentCourses,
    isPrivate: false,
  },
];

export const TEACHER_NAVIGATORS: INavigator[] = [
  {
    id: "home",
    name: "Trang chủ",
    link: ROUTE.home,
    isPrivate: false,
  },
  {
    id: "teacher-courses",
    name: "Khoá học",
    link: ROUTE.teacherCourses,
    isPrivate: false,
  },
];
