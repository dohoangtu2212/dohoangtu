export interface ICourse {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  teacherName: string;
  rating: number;
  ratingCount: number;
  hours: number;
  lessons: number;
  tag?: ICourseTag;
  price: number;
  previousPrice: number;
  updatedAt: string;
}

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
  hours?: number;
  sections: ICourseSection[];
}

export interface IStudentCourse {
  id: string;
  courseId: string;
  courseDetailsId: string;
  progress: number;
  name: string;
  teacherName: string;
  rating: number | null;
}
