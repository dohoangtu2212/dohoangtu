import { DEFAULT_MANAGE_PAGE } from "@/constants/manage-page";
import {
  ICourse,
  ICourseComment,
  ICourseDetails,
  INewCourse,
  INewCourseDetails,
  IStudentCourse,
  IStudentViewCount,
} from "@/types/course";
import { IManagePageReq, IManagePageRes } from "@/types/managePage";
import { INewOrder, IOrder } from "@/types/order";
import { IBaseAuthReq } from "@/types/user";
import { ManagePageHandles } from "@/utils/managePage.handles";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getDatabase,
  ref,
  push,
  child,
  update,
  get,
  remove,
  query,
  set,
} from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export const DB_KEY = {
  courses: "courses",
  coursesDetails: "courses-details",
  orders: "orders",
  users: "users",
  students: "students",
  studentsCourses: "students-courses",
  registerTeacher: "register-teacher",
  managePage: "manage-page",
};

export type Updates = { [key: string]: any };

const TAG = {
  courses: "courses",
  course: "course",
  coursesDetails: "courses-details",
  courseDetails: "course-details",
  orders: "orders",
  studentCourses: "student-courses",
  studentViewsCount: "student-views-count",
  courseDetailsComments: "course-details-comments",
  managePage: "manage-page",
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
            return { data: { ...data, id } };
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
    addCourseDetailsComment: build.mutation<
      { id: string },
      { data: ICourseComment; courseDetailsId: string }
    >({
      async queryFn({ data, courseDetailsId }) {
        try {
          const db = getDatabase();

          const dbRef = ref(db);

          let existingComments: ICourseComment[] = [];

          const commentsSnap = await get(
            child(dbRef, `${DB_KEY.coursesDetails}/${courseDetailsId}/comments`)
          );
          if (commentsSnap.exists()) {
            const values = commentsSnap.val();
            const data = Object.entries(values).map(([key, val]) => ({
              id: key,
              ...(val as any),
            })) as ICourseComment[];

            if (!!data) {
              existingComments = data;
            }
          }

          const newComment = data;
          const updates: { [key: string]: any } = {};
          updates[`/${DB_KEY.coursesDetails}/${courseDetailsId}/comments`] = [
            ...existingComments,
            newComment,
          ];

          await update(ref(db), updates);
          return { data: { id: courseDetailsId as string } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.courseDetailsComments],
    }),
    deleteCourseDetailsComment: build.mutation<
      null,
      { courseDetailsId: string; commentIdx: number }
    >({
      async queryFn({ commentIdx, courseDetailsId }) {
        try {
          const db = getDatabase();

          const dbRef = ref(db);

          const commentRef = child(
            dbRef,
            `${DB_KEY.coursesDetails}/${courseDetailsId}/comments/${commentIdx}`
          );
          await remove(commentRef);

          return { data: null };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.courseDetailsComments],
    }),
    getCourseDetailsComments: build.query<
      { comments: ICourseComment[] },
      { courseDetailsId: string }
    >({
      async queryFn({ courseDetailsId }) {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          let comments: ICourseComment[] = [];

          const commentsSnap = await get(
            child(dbRef, `${DB_KEY.coursesDetails}/${courseDetailsId}/comments`)
          );
          if (commentsSnap.exists()) {
            const data = commentsSnap.val() as ICourseComment[];
            if (!!data) {
              comments = data;
            }
          }
          return { data: { comments } };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [TAG.courseDetailsComments],
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
            return { data: { ...data, id } };
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
      IStudentViewCount | null,
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
    getManagePage: build.query<IManagePageRes | null, null>({
      async queryFn() {
        try {
          const db = getDatabase();
          const dbRef = ref(db);

          const snapshot = await get(
            query(child(dbRef, `${DB_KEY.managePage}`))
          );
          if (snapshot.exists()) {
            let result = Object.entries(snapshot.val()).map(([key, val]) => ({
              id: key,
              ...(val as any),
            })) as IManagePageRes[];
            const res = result.length > 0 ? result[0] : DEFAULT_MANAGE_PAGE;
            return { data: res };
          } else {
            return { data: DEFAULT_MANAGE_PAGE };
          }
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      providesTags: [TAG.managePage],
    }),
    updateIntroduction: build.mutation<IManagePageRes, IManagePageReq>({
      async queryFn(record) {
        try {
          const body = { ...record };
          const db = getDatabase();
          const dbRef = ref(db);

          const resList = await ManagePageHandles.getList(dbRef);
          const resData = await ManagePageHandles.createAndUpdate(
            db,
            resList,
            body
          );
          return { data: resData };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.managePage],
    }),
    updateCommit: build.mutation<IManagePageRes, IManagePageReq>({
      async queryFn(record) {
        try {
          const body = { ...record };
          const db = getDatabase();
          const dbRef = ref(db);

          const resList = await ManagePageHandles.getList(dbRef);

          for (let index = 0; index < body.commits.length; index++) {
            const commit = body.commits[index];
            const newCommitKey = push(child(ref(db), DB_KEY.managePage)).key;
            const commitKey = commit.id ?? newCommitKey!;
            if (!!commit.image) {
              const storage = getStorage();
              const fileRef = storageRef(storage, `commit/${commitKey}`);
              await uploadBytes(fileRef, commit.image);
              const url = await getDownloadURL(fileRef);
              commit.imageUrl = url;
              commit.id = commitKey;
              commit.imageName = commit.image.name;
            }
            delete commit.image;
            body.commits[index] = commit;
          }

          const resData = await ManagePageHandles.createAndUpdate(
            db,
            resList,
            body
          );
          return { data: resData };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.managePage],
    }),
    updateLesson: build.mutation<IManagePageRes, IManagePageReq>({
      async queryFn(record) {
        try {
          const body = { ...record };
          const db = getDatabase();
          const dbRef = ref(db);

          const resList = await ManagePageHandles.getList(dbRef);

          for (let index = 0; index < body.lessons.length; index++) {
            const lesson = body.lessons[index];
            if (!lesson.id) {
              const newLessonKey = push(child(ref(db), DB_KEY.managePage)).key;
              const lessonKey = lesson.id ?? newLessonKey!;
              body.lessons[index].id = lessonKey;
            }
          }

          const resData = await ManagePageHandles.createAndUpdate(
            db,
            resList,
            body
          );
          return { data: resData };
        } catch (e) {
          console.log("e: ", e);
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.managePage],
    }),
    updateReview: build.mutation<IManagePageRes, IManagePageReq>({
      async queryFn(record) {
        try {
          const body = { ...record };
          const db = getDatabase();
          const dbRef = ref(db);

          const resList = await ManagePageHandles.getList(dbRef);

          for (let index = 0; index < body.reviews.length; index++) {
            const review = body.reviews[index];
            const newReviewKey = push(child(ref(db), DB_KEY.managePage)).key;
            const reviewKey = review.id ?? newReviewKey!;
            if (!!review.image) {
              const storage = getStorage();
              const fileRef = storageRef(storage, `review/${reviewKey}`);
              await uploadBytes(fileRef, review.image);
              const url = await getDownloadURL(fileRef);
              review.imageUrl = url;
              review.id = reviewKey;
              review.imageName = review.image.name;
            }
            delete review.image;
            body.reviews[index] = review;
          }

          const resData = await ManagePageHandles.createAndUpdate(
            db,
            resList,
            body
          );
          return { data: resData };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.managePage],
    }),
    updateAvatar: build.mutation<string, { avatar?: File } & IBaseAuthReq>({
      async queryFn(record) {
        try {
          const body = { ...record };
          let AvatarUrl = "";

          if (!!body.avatar) {
            const storage = getStorage();
            const fileRef = storageRef(storage, `avatar/${body.currid}`);
            await uploadBytes(fileRef, body.avatar);
            AvatarUrl = await getDownloadURL(fileRef);
          }
          return { data: AvatarUrl };
        } catch (e) {
          return { error: JSON.stringify(e) };
        }
      },
      invalidatesTags: [TAG.managePage],
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
  useUpdateStudentCourseProgressMutation,
  useAddCourseDetailsCommentMutation,
  useGetCourseDetailsCommentsQuery,
  useDeleteCourseDetailsCommentMutation,
  useGetManagePageQuery,
  useUpdateIntroductionMutation,
  useUpdateCommitMutation,
  useUpdateLessonMutation,
  useUpdateReviewMutation,
  useUpdateAvatarMutation,
} = dbApis;
export default dbApis;
