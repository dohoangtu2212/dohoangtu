import {
  ICourse,
  ICourseDetails,
  INewCourse,
  INewCourseDetails,
  IStudentCourse,
} from "@/types/course";
import { INewOrder, IOrder } from "@/types/order";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  update,
  get,
} from "firebase/database";

const DB_KEY = {
  courses: "courses",
  coursesDetails: "courses-details",
  orders: "orders",
  users: "users",
  students: "students",
  studentsCourses: "students-courses",
};

type Updates = { [key: string]: any };

const TAG = {
  courses: "courses",
  course: "course",
  coursesDetails: "courses-details",
  courseDetails: "course-details",
};

const dbApis = createApi({
  reducerPath: "db",
  tagTypes: Object.values(TAG),
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    // COURSE
    getCourse: build.query<ICourse, { id: string }>({
      async queryFn({ id }) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(child(dbRef, `${DB_KEY.courses}/${id}`));
          if (snapshot.exists()) {
            const data = snapshot.val() as ICourse;
            return { data };
          } else {
            throw new Error("No data available");
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [TAG.course],
    }),
    createCourse: build.mutation<{ id: string }, { data: INewCourse }>({
      async queryFn({ data }) {
        try {
          const db = getDatabase();

          const courseData = data;
          const newCourseKey = push(child(ref(db), DB_KEY.courses)).key;
          const updates: Updates = {};
          updates[`/${DB_KEY.courses}/` + newCourseKey] = courseData;

          await update(ref(db), updates);
          return { data: { id: newCourseKey as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.course],
    }),
    updateCourse: build.mutation<
      { id: string },
      { data: INewCourse; courseId: string }
    >({
      async queryFn({ data, courseId }) {
        try {
          const db = getDatabase();

          const courseData = data;
          const updates: Updates = {};
          updates[`/${DB_KEY.courses}/${courseId}`] = courseData;

          await update(ref(db), updates);
          return { data: { id: courseId as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.courses],
    }),
    getCourses: build.query<ICourse[], void>({
      async queryFn() {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(child(dbRef, `${DB_KEY.courses}`));
          if (snapshot.exists()) {
            const values = snapshot.val();
            const data = Object.entries(values).map(([key, val]) => ({
              id: key,
              ...(val as any),
            })) as ICourse[];

            return { data };
          } else {
            throw new Error("No data available");
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [TAG.courses],
    }),
    // COURSE-DETAILS
    createCourseDetails: build.mutation<
      { id: string },
      { data: INewCourseDetails }
    >({
      async queryFn({ data }) {
        try {
          const db = getDatabase();

          const courseDetailsData = data;
          const newCourseDetailsKey = push(
            child(ref(db), DB_KEY.coursesDetails)
          ).key;
          const updates: { [key: string]: any } = {};
          updates[`/${DB_KEY.coursesDetails}/` + newCourseDetailsKey] =
            courseDetailsData;

          await update(ref(db), updates);
          return { data: { id: newCourseDetailsKey as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.courseDetails],
    }),
    updateCourseDetails: build.mutation<
      { id: string },
      { data: INewCourseDetails; courseDetailsId: string }
    >({
      async queryFn({ data, courseDetailsId }) {
        try {
          const db = getDatabase();

          const courseDetailsData = data;
          const updates: { [key: string]: any } = {};
          updates[`/${DB_KEY.coursesDetails}/${courseDetailsId}`] =
            courseDetailsData;

          await update(ref(db), updates);
          return { data: { id: courseDetailsId as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.courseDetails],
    }),
    getCourseDetails: build.query<ICourseDetails, { id: string }>({
      async queryFn({ id }) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(
            child(dbRef, `${DB_KEY.coursesDetails}/${id}`)
          );
          if (snapshot.exists()) {
            const data = snapshot.val() as ICourseDetails;
            return { data };
          } else {
            throw new Error("No data available");
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [TAG.courseDetails],
    }),

    // ORDER
    createOrder: build.mutation<{ id: string }, INewOrder>({
      async queryFn(order) {
        try {
          const db = getDatabase();
          const newOrderKey = push(child(ref(db), DB_KEY.orders)).key;
          const updates: Updates = {};
          updates[`/${DB_KEY.orders}/` + newOrderKey] = order;

          await update(ref(db), updates);
          return { data: { id: newOrderKey as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [],
    }),
    getOrders: build.query<IOrder[], void>({
      async queryFn(order) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(child(dbRef, `${DB_KEY.orders}`));
          if (snapshot.exists()) {
            const values = snapshot.val();
            const data = Object.entries(values).map(([key, val]) => ({
              id: key,
              ...(val as any),
            })) as IOrder[];

            return { data };
          } else {
            throw new Error("No data available");
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [],
    }),
    confirmOrder: build.mutation<null, { orderId: string }>({
      async queryFn({ orderId }) {
        try {
          const db = getDatabase();
          const updates: Updates = {};
          updates[`/${DB_KEY.orders}/${orderId}/isConfirmed`] = true;

          await update(ref(db), updates);
          return { data: null };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [],
    }),

    // USER
    updateStudentCourses: build.mutation<
      unknown,
      { courses: IStudentCourse[]; userId: string }
    >({
      async queryFn({ courses, userId }) {
        try {
          const db = getDatabase();
          const updates: Updates = {};
          updates[`/${DB_KEY.students}/${userId}/courses`] = courses;

          await update(ref(db), updates);
          return { data: { id: userId as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [],
    }),
    getStudentCourses: build.query<IStudentCourse[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(
            child(dbRef, `${DB_KEY.students}/${userId}/courses`)
          );
          if (snapshot.exists()) {
            const values = snapshot.val();
            const data = Object.entries(values).map(([key, val]) => ({
              id: key,
              ...(val as any),
            })) as IStudentCourse[];

            return { data };
          } else {
            throw new Error("No data available");
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useCreateCourseDetailsMutation,
  useGetCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useUpdateCourseDetailsMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useUpdateStudentCoursesMutation,
  useConfirmOrderMutation,
  useGetStudentCoursesQuery,
} = dbApis;
export default dbApis;
