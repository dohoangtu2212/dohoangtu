import type { INavigator } from "@/types/navigator";

export const NAVIGATORS: INavigator[] = [
  {
    id: "home",
    name: "Trang chủ",
    link: "/",
    isPrivate: false,
  },
  {
    id: "books",
    name: "Sách",
    link: "/",
    isPrivate: false,
  },
  {
    id: "courses ",
    name: "Khoá học",
    link: "/",
    isPrivate: false,
  },
  {
    id: "documents",
    name: "Tài liệu",
    link: "/",
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
