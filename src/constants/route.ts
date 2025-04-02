import { PERMISSION } from "@/constants/permission";
export const ROUTE = {
  auth: "/auth",
  home: "/",
  studentHome: "/student",
  studentCourses: "/student/courses",
  studentCourseView: "/student/courses/[courseId]/view",

  teacherCourseView: "/teacher/courses/[courseId]/view",
  teacherHome: "/teacher",
  teacherCourses: "/teacher/courses",
  teacherOrders: "/teacher/orders",
  teacherCoursesNew: "/teacher/courses/new",

  adminManageAccount: "/admin/manage-account",
  adminManageTeachers: "/admin/manage-teachers",
  adminManagePage: "/admin/manage-page",
  accountInfo: "/account/info",
  accountPermission: "/account/permission",

  courses: "/courses",
  books: "/books",
  documents: "/documents",

  store: "/store",
  storeCourseDetails: "/store/courses/[courseId]",

  contact: "/contact",
  features: "/features",
  cart: "/cart",
  demoCourseView: "/demo/courses/[courseId]/view",
  registerTeacher: "/register-teacher",
  accountActivation: "/account-activation",
};

export const PUBLIC_ROUTES = [
  ROUTE.home,
  ROUTE.auth,
  ROUTE.courses,
  ROUTE.books,
  ROUTE.documents,
  ROUTE.store,
  ROUTE.contact,
  ROUTE.features,
  ROUTE.cart,
  ROUTE.demoCourseView,
  ROUTE.storeCourseDetails,
  ROUTE.registerTeacher,
];

export const PRIVATE_ROUTES = [ROUTE.accountActivation];

export const PERMISSION_ROUTES = {
  [PERMISSION.MY_COURSES.READ]: ROUTE.studentCourses,
  [PERMISSION.ORDERS.READ]: ROUTE.teacherOrders,
  [PERMISSION.MANAGE_COURSE.READ]: ROUTE.teacherCourses,
  [PERMISSION.MANAGE_COURSE.READ_DETAIL]: ROUTE.teacherCourseView,
  [PERMISSION.MANAGE_COURSE.ADD_EDIT]: ROUTE.teacherCoursesNew,
  [PERMISSION.MANAGE_ACCOUNT.READ]: ROUTE.adminManageAccount,
  [PERMISSION.MANAGE_TEACHER.READ]: ROUTE.adminManageTeachers,
  [PERMISSION.MANAGE_PAGE.READ]: ROUTE.adminManagePage,
  [PERMISSION.ACCOUNT.INFO_READ]: ROUTE.accountInfo,
  [PERMISSION.ACCOUNT.PERMISSION_READ]: ROUTE.accountPermission,
};
