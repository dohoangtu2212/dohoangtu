import { ICourse, ICourseDetails, ICourseTag } from "@/types/course";
import { ICourseLessonType } from "@/types/course";

export const COURSES: ICourse[] = [
  {
    id: "1",
    name: "The Complete Python Bootcamp From Zero to Hero in Python",
    description:
      "Learn Python like a Professional  Start from the basics and go all the way to creating your own applications and games",
    thumbnailUrl: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
    teacherName: "Jose Portilla",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lectures: 155,
    tag: ICourseTag.bestSeller,
    price: 429000,
    previousPrice: 2399000,
  },
  {
    id: "2",
    name: "The Complete Python Bootcamp From Zero to Hero in Python",
    description:
      "Learn Python like a Professional  Start from the basics and go all the way to creating your own applications and games",
    thumbnailUrl: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
    teacherName: "Jose Portilla",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lectures: 155,
    tag: ICourseTag.bestSeller,
    price: 429000,
    previousPrice: 2399000,
  },
  {
    id: "3",
    name: "The Complete Python Bootcamp From Zero to Hero in Python",
    description:
      "Learn Python like a Professional  Start from the basics and go all the way to creating your own applications and games",
    thumbnailUrl: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
    teacherName: "Jose Portilla",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lectures: 155,
    tag: ICourseTag.hotAndNew,
    price: 429000,
    previousPrice: 2399000,
  },
  {
    id: "4",
    name: "The Complete Python Bootcamp From Zero to Hero in Python",
    description:
      "Learn Python like a Professional  Start from the basics and go all the way to creating your own applications and games",
    thumbnailUrl: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
    teacherName: "Jose Portilla",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lectures: 155,
    price: 429000,
    previousPrice: 2399000,
  },
];

export const COURSE_DETAILS: ICourseDetails = {
  id: "1",
  name: "KHOÁ PRO X LUYỆN THI THPT QUỐC GIA MÔN TOÁN 2023",
  description: "TBA",
  thumbnailUrl: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
  teacherName: "Đỗ Hoàng Tú",
  sections: [
    {
      order: 1,
      name: "HÀM SỐ VÀ ĐỒ THỊ HÀM SỐ",
      lessons: [
        {
          order: 1,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          isCompleted: true,
          duration: 20 * 60,
          dyntubeKey: "TpxuRmTzlkG0W6i7jEOanQ",
        },
        {
          order: 2,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          isCompleted: false,
          duration: 15 * 60,
          dyntubeKey: "WvnVKrOOm0m44ZdMuAQXVQ",
        },
        {
          order: 3,
          name: "Mối quan hệ giữa đơn điệu của hàm số và đạo hàm - Xét chiều biến thiên của hàm số",
          type: ICourseLessonType.assignment,
          isCompleted: false,
          duration: 12 * 60,
          dyntubeKey: "nAgdm5gcEyxCQCWp2jdcg",
        },
      ],
    },
    {
      order: 2,
      name: "HÀM SỐ VÀ ĐỒ THỊ HÀM SỐ",
      lessons: [
        {
          order: 4,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          isCompleted: true,
          duration: 20 * 60,
          dyntubeKey: "TpxuRmTzlkG0W6i7jEOanQ",
        },
        {
          order: 5,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          isCompleted: false,
          duration: 15 * 60,
          dyntubeKey: "WvnVKrOOm0m44ZdMuAQXVQ",
        },
        {
          order: 6,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.assignment,
          isCompleted: false,
          duration: 12 * 60,
          dyntubeKey: "nAgdm5gcEyxCQCWp2jdcg",
        },
      ],
    },
  ],
};
