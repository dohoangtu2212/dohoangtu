import {
  ICourse,
  ICourseDetails,
  INewCourse,
  INewCourseDetails,
} from "@/types/course";
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
};

type Updates = { [key: string]: any };

const dbApis = createApi({
  reducerPath: "db",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
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
      invalidatesTags: [],
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
      providesTags: [],
    }),
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
      invalidatesTags: [],
    }),
    getCourseDetails: build.query<{ data: ICourseDetails }, { id: string }>({
      async queryFn({ id }) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(
            child(dbRef, `${DB_KEY.coursesDetails}/${id}`)
          );
          if (snapshot.exists()) {
            const data = snapshot.val() as ICourseDetails;
            return { data: { data } };
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
} = dbApis;
export default dbApis;
