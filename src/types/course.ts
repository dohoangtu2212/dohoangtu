export interface ICourse {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  teacherName: string;
  rating?: number;
  ratingCount?: number;
  hours: number;
  lessons: number;
  tag?: ICourseTag;
  price: number;
  previousPrice?: number;
  updatedAt: string;
  courseDetailsId?: string;
  slug?: string;
}

export type INewCourse = Omit<ICourse, "id" | "rating" | "ratingCount">;

export enum ICourseTag {
  bestSeller = "Bestseller",
  hotAndNew = "Hot & new",
}

export enum ICourseLessonType {
  video = "video",
  assignment = "assignment",
}

export interface ICourseLesson {
  order: number;
  name: string;
  isCompleted: boolean;
  type: ICourseLessonType;
  duration: number;
  dyntubeKey: string;
  dyntubeVideoId: string;
}

export interface ICourseSection {
  order: number;
  name: string;
  lessons: ICourseLesson[];
}
export interface ICourseDetails {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  teacherName: string;
  rating?: number;
  ratingCount?: number;
  hours: number;
  sections: ICourseSection[];
}

export type INewCourseDetails = Omit<ICourseDetails, "id">;

export interface IStudentCourse {
  id: string;
  courseId: string;
  courseDetailsId: string;
  progress: number;
  name: string;
  teacherName: string;
  rating: number | null;
}

export interface ICourseFormValues {
  name: string;
  description: string;
  thumbnailUrl: string;
  teacherName: string;
  hours: number;
  lessons: number;
  price: number;
  sections: ICourseSection[];
}
