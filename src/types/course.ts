export interface ICourse {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  teacherName: string;
  rating: number;
  ratingCount: number;
  hours: number;
  lectures: number;
  tag?: ICourseTag;
  price: number;
  previousPrice: number;
}

export enum ICourseTag {
  bestSeller = "Bestseller",
  hotAndNew = "Hot & new",
}
