import type { INavigator } from "@/types/navigator";
import { ROUTE } from "@/constants/route";

export const PUBLIC_NAVIGATORS: INavigator[] = [
  {
    id: "home",
    name: "Trang chủ",
    link: ROUTE.home,
    isPrivate: false,
  },
  {
    id: "books",
    name: "Sách",
    link: ROUTE.books,
    isPrivate: false,
  },
  {
    id: "courses",
    name: "Khoá học",
    link: ROUTE.courses,
    isPrivate: false,
  },
  {
    id: "documents",
    name: "Tài liệu",
    link: ROUTE.documents,
    isPrivate: false,
  },
  {
    id: "features",
    name: "Tính năng",
    link: "/",
    isPrivate: false,
  },
  {
    id: "contact",
    name: "Liên hệ",
    link: "/",
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
    id: "my-courses",
    name: "Khoá học",
    link: ROUTE.studentCourses,
    isPrivate: false,
  },
];
