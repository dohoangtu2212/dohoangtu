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
  courseDetailsId: string;
  slug?: string;
  studentIds?: string[];
}

export type INewCourse = Omit<ICourse, "id" | "rating" | "ratingCount"> & {
  thumbnailFile?: File | null;
};

export enum ICourseTag {
  bestSeller = "Bestseller",
  hotAndNew = "Hot & new",
}

export enum ICourseLessonType {
  video = "video",
  assignment = "assignment",
}

export interface ICourseLesson {
  order: number | string;
  name: string;
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
  courseId?: string;
  sections: ICourseSection[];
}

export type INewCourseDetails = Omit<ICourseDetails, "id"> & {
  thumbnailFile?: File | null;
};

export interface IStudentCourse {
  courseId: string;
  courseDetailsId: string;
  progress: number;
  name: string;
  teacherName: string;
  rating: number | null;
  price: ICourse["price"];
  thumbnailUrl: ICourse["thumbnailUrl"];
}

export interface ICourseFormValues {
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailFile: File | null;
  teacherName: string;
  hours: number;
  lessons: number;
  price: number;
  previousPrice?: number;
  sections: ICourseSection[];
}
