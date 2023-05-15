import { ICourse, ICourseDetails, ICourseTag } from "@/types/course";
import { ICourseLessonType } from "@/types/course";
import dayjs from "dayjs";

export const COURSES: ICourse[] = [
  {
    id: "1",
    name: "KHOÁ HỌC PRO X LUYỆN THI THPT QUỐC GIA MÔN TOÁN 2023",
    description:
      "Đây là Khoá học lớn nhất và đầy đủ nhất tại Vted dành riêng cho học sinh 2K5 luyện thi THPT quốc gia 2023 Môn Toán. Khoá cung cấp toàn bộ kiến thức cơ bản SGK 12 và phần nâng cao định hướng ôn luyện thi THPT Quốc Gia Môn Toán 2023. Khoá học tích hợp cả kiến thức Luyện thi của lớp 10 và 11 có trong kì thi THPT Quốc Gia 2023 môn Toán. Các kiến thức khoá học cung cấp cho các em đủ để đạt ít nhất 9,0 điểm trong kì thi THPT Quốc Gia 2023. ",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    teacherName: "Đỗ Hoàng Tú",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lessons: 155,
    tag: ICourseTag.bestSeller,
    price: 429000,
    previousPrice: 2399000,
    updatedAt: dayjs().toString(),
    courseDetailsId: "",
  },
  {
    id: "2",
    name: "KHOÁ PRO XMAX CHINH PHỤC NHÓM CÂU HỎI VẬN DỤNG CAO MÔN TOÁN 2023",
    description:
      "Luyện nâng cao 9 đến 10 chỉ dành cho học sinh giỏi Học qua bài giảng và làm đề thi nhóm câu hỏi Vận dụng cao trong đề thi THPT Quốc Gia thuộc tất cả chủ đề đã có trong khoá PRO X. Khoá PRO XMAX học hiệu quả nhất khi các em đã hoàn thành chương trình kì I Toán 12 (tức đã hoàn thành Logarit và Thể tích khối đa diện) có trong Khoá PRO X. Mục tiêu của khoá học giúp các em tự tin đạt kết quả từ 8,5 đếm 10 điểm",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    teacherName: "Đỗ Hoàng Tú",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lessons: 155,
    tag: ICourseTag.bestSeller,
    price: 429000,
    previousPrice: 2399000,
    updatedAt: dayjs().toString(),
    courseDetailsId: "",
  },
  {
    id: "3",
    name: "KHOÁ PRO XPLUS - LUYỆN ĐỀ THAM KHẢO THPT QUỐC GIA 2023 MÔN TOÁN",
    description:
      "Kể từ kì thi 2023 khoá luyện đề XPLUS sẽ được Vted làm tinh gọn lại thông qua gộp nội dung từ hai khoá luyện đề do vted phát hành là XPLUS và XMIN như các năm 2022 trở về trước. Ngoài ra do nhiều trường Đại học dần sử dụng kết quả của các kì thi đánh gía năng lực - Đánh giá tư duy nên khoá học sẽ bổ sung cho các em ở chương cuối cùng của khoá học các đề thi dạng này.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    teacherName: "Đỗ Hoàng Tú",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lessons: 155,
    tag: ICourseTag.hotAndNew,
    price: 429000,
    previousPrice: 2399000,
    updatedAt: dayjs().toString(),
    courseDetailsId: "",
  },
  {
    id: "4",
    name: "KHOÁ PRO XPLUS - LUYỆN ĐỀ THAM KHẢO THPT QUỐC GIA 2023 MÔN TOÁN",
    description:
      "Kể từ kì thi 2023 khoá luyện đề XPLUS sẽ được Vted làm tinh gọn lại thông qua gộp nội dung từ hai khoá luyện đề do vted phát hành là XPLUS và XMIN như các năm 2022 trở về trước. Ngoài ra do nhiều trường Đại học dần sử dụng kết quả của các kì thi đánh gía năng lực - Đánh giá tư duy nên khoá học sẽ bổ sung cho các em ở chương cuối cùng của khoá học các đề thi dạng này.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    teacherName: "Đỗ Hoàng Tú",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lessons: 155,
    price: 429000,
    previousPrice: 2399000,
    updatedAt: dayjs().toString(),
    courseDetailsId: "",
  },
  {
    id: "5",
    name: "KHOÁ PRO XPLUS - LUYỆN ĐỀ THAM KHẢO THPT QUỐC GIA 2023 MÔN TOÁN",
    description:
      "Kể từ kì thi 2023 khoá luyện đề XPLUS sẽ được Vted làm tinh gọn lại thông qua gộp nội dung từ hai khoá luyện đề do vted phát hành là XPLUS và XMIN như các năm 2022 trở về trước. Ngoài ra do nhiều trường Đại học dần sử dụng kết quả của các kì thi đánh gía năng lực - Đánh giá tư duy nên khoá học sẽ bổ sung cho các em ở chương cuối cùng của khoá học các đề thi dạng này.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    teacherName: "Đỗ Hoàng Tú",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lessons: 155,
    price: 429000,
    previousPrice: 2399000,
    updatedAt: dayjs().toString(),
    courseDetailsId: "",
  },
  {
    id: "6",
    name: "KHOÁ PRO XPLUS - LUYỆN ĐỀ THAM KHẢO THPT QUỐC GIA 2023 MÔN TOÁN",
    description:
      "Kể từ kì thi 2023 khoá luyện đề XPLUS sẽ được Vted làm tinh gọn lại thông qua gộp nội dung từ hai khoá luyện đề do vted phát hành là XPLUS và XMIN như các năm 2022 trở về trước. Ngoài ra do nhiều trường Đại học dần sử dụng kết quả của các kì thi đánh gía năng lực - Đánh giá tư duy nên khoá học sẽ bổ sung cho các em ở chương cuối cùng của khoá học các đề thi dạng này.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    teacherName: "Đỗ Hoàng Tú",
    rating: 4.6,
    ratingCount: 461006,
    hours: 22,
    lessons: 155,
    price: 429000,
    previousPrice: 2399000,
    updatedAt: dayjs().toString(),
    courseDetailsId: "",
  },
];

export const COURSE_DETAILS: ICourseDetails = {
  id: "1",
  name: "KHOÁ PRO X LUYỆN THI THPT QUỐC GIA MÔN TOÁN 2023",
  description: "TBA",
  thumbnailUrl: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
  teacherName: "Đỗ Hoàng Tú",
  hours: 0,
  sections: [
    {
      order: 1,
      name: "HÀM SỐ VÀ ĐỒ THỊ HÀM SỐ",
      lessons: [
        {
          order: 1,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          duration: 20 * 60,
          dyntubeKey: "TpxuRmTzlkG0W6i7jEOanQ",
          dyntubeVideoId: "",
        },
        {
          order: 2,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          duration: 15 * 60,
          dyntubeKey: "WvnVKrOOm0m44ZdMuAQXVQ",
          dyntubeVideoId: "",
        },
        {
          order: 3,
          name: "Mối quan hệ giữa đơn điệu của hàm số và đạo hàm - Xét chiều biến thiên của hàm số",
          type: ICourseLessonType.assignment,
          duration: 12 * 60,
          dyntubeKey: "nAgdm5gcEyxCQCWp2jdcg",
          dyntubeVideoId: "",
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
          duration: 20 * 60,
          dyntubeKey: "TpxuRmTzlkG0W6i7jEOanQ",
          dyntubeVideoId: "",
        },
        {
          order: 5,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.video,
          duration: 15 * 60,
          dyntubeKey: "WvnVKrOOm0m44ZdMuAQXVQ",
          dyntubeVideoId: "",
        },
        {
          order: 6,
          name: "Đơn điệu của hàm số và các tính chất của hàm đơn điệu",
          type: ICourseLessonType.assignment,
          duration: 12 * 60,
          dyntubeKey: "nAgdm5gcEyxCQCWp2jdcg",
          dyntubeVideoId: "",
        },
      ],
    },
  ],
};
