import { IObjectPermission, UserRole } from "@/types/permission";

export const GROUP_PERMISSION = {
  MY_COURSES: "GROUP_PERMISSION_MY_COURSES",
  ORDERS: "GROUP_PERMISSION_ORDERS",
  MANAGE_COURSE: "GROUP_PERMISSION_MANAGE_COURSE",
  MANAGE_ACCOUNT: "GROUP_PERMISSION_MANAGE_ACCOUNT",
  MANAGE_TEACHER: "GROUP_PERMISSION_MANAGE_TEACHER",
  MANAGE_PAGE: "GROUP_PERMISSION_MANAGE_PAGE",
  ACCOUNT: "GROUP_PERMISSION_ACCOUNT",
};

export const PERMISSION = {
  MY_COURSES: {
    READ: "MY_COURSES_READ",
    READ_DETAIL: "MY_COURSES_READ_DETAIL",
  },
  ORDERS: {
    READ: "ORDERS_READ",
  },
  MANAGE_COURSE: {
    READ: "MANAGE_COURSE_READ",
    READ_DETAIL: "MANAGE_COURSE_READ_DETAIL",
    ADD: "MANAGE_COURSE_ADD",
    EDIT: "MANAGE_COURSE_EDIT",
    DELETE: "MANAGE_COURSE_DELETE",
  },
  MANAGE_ACCOUNT: {
    READ: "MANAGE_ACCOUNT_COURSE_READ",
    EDIT: "MANAGE_ACCOUNT_COURSE_EDIT",
    DELETE: "MANAGE_ACCOUNT_COURSE_DELETE",
  },
  MANAGE_TEACHER: {
    READ: "MANAGE_TEACHER_COURSE_READ",
    EDIT: "MANAGE_TEACHER_COURSE_EDIT",
    DELETE: "MANAGE_TEACHER_COURSE_DELETE",
  },
  MANAGE_PAGE: {
    READ: "MANAGE_PAGE_COURSE_READ",
    EDIT: "MANAGE_PAGE_COURSE_EDIT",
  },
  ACCOUNT: {
    INFO_READ: "ACCOUNT_INFO_READ",
    PERMISSION_READ: "ACCOUNT_PERMISSION_READ",
  },
};

export const DEFAULT_PERMISSION: IObjectPermission = {
  data: [
    {
      code: GROUP_PERMISSION.MY_COURSES,
      name: "Khoá học của tôi",
      children: [
        {
          code: PERMISSION.MY_COURSES.READ,
          name: "Truy cập trang Khoá học của tôi",
          description: "Cho phép người dùng truy cập trang Khoá học của tôi",
          roles: [UserRole.student],
        },
        {
          code: PERMISSION.MY_COURSES.READ_DETAIL,
          name: "Truy cập trang Chi tiết khoá học của tôi",
          description:
            "Cho phép người dùng truy cập trang Chi tiết khoá học của tôi",
          roles: [],
          disabledStudent: true,
        },
      ],
    },
    {
      code: GROUP_PERMISSION.ORDERS,
      name: "Đơn hàng",
      children: [
        {
          code: PERMISSION.ORDERS.READ,
          name: "Truy cập trang Đơn hàng",
          description: "Cho phép người dùng truy cập trang Đơn hàng",
          roles: [UserRole.teacher],
        },
      ],
    },
    {
      code: GROUP_PERMISSION.MANAGE_COURSE,
      name: "Quản lý khoá học",
      children: [
        {
          code: PERMISSION.MANAGE_COURSE.READ,
          name: "Truy cập trang Quản lý khoá học",
          description: "Cho phép người dùng truy cập trang Quản lý khoá học",
          roles: [UserRole.teacher],
        },
        {
          code: PERMISSION.MANAGE_COURSE.READ_DETAIL,
          name: "Truy cập trang Chi tiết quản lý khoá học",
          description:
            "Cho phép người dùng truy cập trang Chi tiết quản lý khoá học",
          roles: [UserRole.teacher],
        },
        // {
        //   code: PERMISSION.MANAGE_COURSE.ADD,
        //   name: "Tạo mới khoá học",
        //   description: "Cho phép người dùng tạo mới khoá học",
        //   roles: [UserRole.teacher],
        // },
        // {
        //   code: PERMISSION.MANAGE_COURSE.EDIT,
        //   name: "Cập nhật khoá học",
        //   description: "Cho phép người dùng cập nhật khoá học",
        //   roles: [UserRole.teacher],
        // },
        // {
        //   code: PERMISSION.MANAGE_COURSE.DELETE,
        //   name: "Xoá khoá học",
        //   description: "Cho phép người dùng xoá khoá học",
        //   roles: [UserRole.teacher],
        // },
      ],
    },
    {
      code: GROUP_PERMISSION.MANAGE_ACCOUNT,
      name: "Quản lý tài khoản",
      children: [
        {
          code: PERMISSION.MANAGE_ACCOUNT.READ,
          name: "Truy cập trang Quản lý tài khoản",
          description: "Cho phép người dùng truy cập trang Quản lý tài khoản",
          roles: [UserRole.admin],
        },
        // {
        //   code: PERMISSION.MANAGE_ACCOUNT.EDIT,
        //   name: "Cập nhật tài khoản",
        //   description: "Cho phép người dùng cập nhật tài khoản",
        //   roles: [UserRole.admin],
        // },
        // {
        //   code: PERMISSION.MANAGE_ACCOUNT.DELETE,
        //   name: "Xoá tài khoản",
        //   description: "Cho phép người dùng xoá tài khoản",
        //   roles: [UserRole.admin],
        // },
      ],
    },
    {
      code: GROUP_PERMISSION.MANAGE_TEACHER,
      name: "Quản lý giáo viên",
      children: [
        {
          code: PERMISSION.MANAGE_TEACHER.READ,
          name: "Truy cập trang Quản lý giáo viên",
          description: "Cho phép người dùng truy cập trang Quản lý giáo viên",
          roles: [UserRole.admin],
        },
        // {
        //   code: PERMISSION.MANAGE_TEACHER.EDIT,
        //   name: "Cập nhật giáo viên",
        //   description: "Cho phép người dùng cập nhật giáo viên",
        //   roles: [UserRole.admin],
        // },
        // {
        //   code: PERMISSION.MANAGE_TEACHER.DELETE,
        //   name: "Xoá giáo viên",
        //   description: "Cho phép người dùng xoá giáo viên",
        //   roles: [UserRole.admin],
        // },
      ],
    },
    {
      code: GROUP_PERMISSION.MANAGE_PAGE,
      name: "Quản lý trang chủ",
      children: [
        {
          code: PERMISSION.MANAGE_PAGE.READ,
          name: "Truy cập trang quản lý trang chủ",
          description: "Cho phép người dùng truy cập trang quản lý trang chủ",
          roles: [UserRole.admin],
        },
        // {
        //   code: PERMISSION.MANAGE_PAGE.EDIT,
        //   name: "Cập nhật trang chủ",
        //   description: "Cho phép người dùng cập nhật trang chủ",
        //   roles: [UserRole.admin],
        // },
      ],
    },
    {
      code: GROUP_PERMISSION.ACCOUNT,
      name: "Quản lý tài khoản của tôi",
      hidden: true,
      children: [
        {
          code: PERMISSION.ACCOUNT.INFO_READ,
          name: "Truy cập trang Thông tin tài khoản",
          description: "Cho phép người dùng truy cập trang Thông tin tài khoản",
          roles: [UserRole.student, UserRole.teacher, UserRole.admin],
        },
        {
          code: PERMISSION.ACCOUNT.PERMISSION_READ,
          name: "Truy cập trang Phân quyền",
          description: "Cho phép người dùng truy cập trang Phân quyền",
          roles: [UserRole.admin],
          disabledStudent: true,
          disabledTeacher: true,
        },
      ],
    },
  ],
  mapData: {
    [`${PERMISSION.MY_COURSES.READ}`]: [UserRole.student],
    [`${PERMISSION.MY_COURSES.READ_DETAIL}`]: [],
    [`${PERMISSION.ORDERS.READ}`]: [UserRole.teacher],
    [`${PERMISSION.MANAGE_COURSE.READ}`]: [UserRole.teacher],
    [`${PERMISSION.MANAGE_COURSE.READ_DETAIL}`]: [UserRole.teacher],
    // [`${PERMISSION.MANAGE_COURSE.ADD}`]: [UserRole.teacher],
    // [`${PERMISSION.MANAGE_COURSE.EDIT}`]: [UserRole.teacher],
    // [`${PERMISSION.MANAGE_COURSE.DELETE}`]: [UserRole.teacher],
    [`${PERMISSION.MANAGE_ACCOUNT.READ}`]: [UserRole.admin],
    // [`${PERMISSION.MANAGE_ACCOUNT.EDIT}`]: [UserRole.admin],
    // [`${PERMISSION.MANAGE_ACCOUNT.DELETE}`]: [UserRole.admin],
    [`${PERMISSION.MANAGE_TEACHER.READ}`]: [UserRole.admin],
    // [`${PERMISSION.MANAGE_TEACHER.EDIT}`]: [UserRole.admin],
    // [`${PERMISSION.MANAGE_TEACHER.DELETE}`]: [UserRole.admin],
    [`${PERMISSION.MANAGE_PAGE.READ}`]: [UserRole.admin],
    // [`${PERMISSION.MANAGE_PAGE.EDIT}`]: [UserRole.admin],
    [`${PERMISSION.ACCOUNT.INFO_READ}`]: [
      UserRole.student,
      UserRole.teacher,
      UserRole.admin,
    ],
    [`${PERMISSION.ACCOUNT.PERMISSION_READ}`]: [UserRole.admin],
  },
};
