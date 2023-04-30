import type { INavigator } from "@/types/navigator";
import { ROUTE } from "@/constants/route";

export const NAVIGATORS: INavigator[] = [
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
    id: "courses ",
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
];

export const PUBLIC_NAVIGATORS: INavigator[] = [
  ...NAVIGATORS,
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
