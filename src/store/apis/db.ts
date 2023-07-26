import {
  ICourse,
  ICourseDetails,
  INewCourse,
  INewCourseDetails,
  IStudentCourse,
} from "@/types/course";
import { INewOrder, IOrder } from "@/types/order";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDatabase, ref, push, child, update, get } from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

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
  orders: "orders",
  studentCourses: "student-courses",
  studentViewsCount: "student-views-count",
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
          if (!!courseData.thumbnailFile && !courseData.thumbnailUrl) {
            const storage = getStorage();
            const fileRef = storageRef(storage, `thumbnail/${newCourseKey}`);
            await uploadBytes(fileRef, courseData.thumbnailFile);
            const url = await getDownloadURL(fileRef);
            courseData.thumbnailUrl = url;
          }
          delete courseData.thumbnailFile;

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

          const res = await update(ref(db), updates);
          return { data: { id: courseId as string } };
        } catch (error) {
          return { error };
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
      { id: string; thumbnailUrl: string },
      { data: INewCourseDetails }
    >({
      async queryFn({ data }) {
        try {
          const db = getDatabase();

          const courseDetailsData = data;
          const newCourseDetailsKey = push(
            child(ref(db), DB_KEY.coursesDetails)
          ).key;

          if (
            !!courseDetailsData.thumbnailFile &&
            !courseDetailsData.thumbnailUrl
          ) {
            const storage = getStorage();
            const fileRef = storageRef(
              storage,
              `thumbnail/${courseDetailsData.courseId}`
            );
            await uploadBytes(fileRef, courseDetailsData.thumbnailFile);
            const url = await getDownloadURL(fileRef);
            courseDetailsData.thumbnailUrl = url;
          }
          delete courseDetailsData.thumbnailFile;

          const updates: { [key: string]: any } = {};
          updates[`/${DB_KEY.coursesDetails}/` + newCourseDetailsKey] =
            courseDetailsData;

          await update(ref(db), updates);
          return {
            data: {
              id: newCourseDetailsKey as string,
              thumbnailUrl: courseDetailsData.thumbnailUrl,
            },
          };
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

          const res = await update(ref(db), updates);
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
          const data = { ...order };
          const db = getDatabase();
          const newOrderKey = push(child(ref(db), DB_KEY.orders)).key;
          if (!!data.screenshot) {
            const storage = getStorage();
            const fileRef = storageRef(storage, `order/${newOrderKey}`);
            await uploadBytes(fileRef, data.screenshot);
            const url = await getDownloadURL(fileRef);
            data.screenshotUrl = url;
          }
          delete data.screenshot;

          const updates: Updates = {};
          updates[`/${DB_KEY.orders}/` + newOrderKey] = data;

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
      providesTags: [TAG.orders],
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
      invalidatesTags: [TAG.orders],
    }),

    // STUDENT
    updateStudentCourses: build.mutation<
      unknown,
      { courses: IStudentCourse[]; studentId: string }
    >({
      async queryFn({ courses, studentId }) {
        try {
          const db = getDatabase();
          const updates: Updates = {};
          updates[`/${DB_KEY.students}/${studentId}/courses`] = courses;

          await update(ref(db), updates);
          return { data: { id: studentId as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.studentCourses],
    }),
    updateStudentCourseProgress: build.mutation<
      number,
      { studentId: string; studentCourseId: string; progress: number }
    >({
      async queryFn({ studentId, studentCourseId, progress }) {
        try {
          const db = getDatabase();
          const updates: Updates = {};
          updates[
            `/${DB_KEY.students}/${studentId}/courses/${studentCourseId}/progress`
          ] = progress;

          await update(ref(db), updates);
          return { data: progress };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.studentCourses],
    }),
    // TODO: optimize method of updating this
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
      providesTags: [TAG.studentCourses],
    }),
    getStudentViewsCount: build.query<
      IStudentCourse["viewsCount"] | null,
      { studentId: string }
    >({
      async queryFn({ studentId }) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(
            child(dbRef, `${DB_KEY.students}/${studentId}/viewsCount`)
          );
          if (snapshot.exists()) {
            const value = snapshot.val();
            return { data: value };
          } else {
            return { data: null };
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [TAG.studentViewsCount],
    }),
    updateStudentViewsCount: build.mutation<
      number,
      { studentId: string; dyntubeVideoKey: string; count: number }
    >({
      async queryFn({ studentId, dyntubeVideoKey, count }) {
        try {
          const db = getDatabase();
          const updates: Updates = {};
          updates[
            `/${DB_KEY.students}/${studentId}/viewsCount/${dyntubeVideoKey}`
          ] = count;

          await update(ref(db), updates);
          return { data: count };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.studentViewsCount],
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
  useGetStudentViewsCountQuery,
  useUpdateStudentViewsCountMutation,
  useUpdateStudentCourseProgressMutation
} = dbApis;
export default dbApis;
