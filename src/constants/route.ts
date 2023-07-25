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
  courses: "/courses",
  books: "/books",
  documents: "/documents",

  store: "/store",
  storeCourseDetails: "/store/courses/[courseId]",

  contact: "/contact",
  features: "/features",
  cart: "/cart",
  demoCourseView: "/demo/courses/[courseId]/view",
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
];
