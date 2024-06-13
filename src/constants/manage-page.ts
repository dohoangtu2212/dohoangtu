import { IManagePageRes } from "@/types/managePage";
import * as Yup from "yup";

export const DEFAULT_MANAGE_PAGE: IManagePageRes = {
  id: "",
  introduceTextFirst: "",
  introduceTextSecond: "",
  introduceTextThird: "",
  description: "",
  introVideo: "",
  commits: [],
  lessons: [],
  reviews: [],
};

export const MANAGE_PAGE_ERRORS = {
  noIntroduceTextFirst: "Giới thiệu 1 chưa được điền.",
  noIntroduceTextSecond: "Giới thiệu 2 chưa được điền.",
  noIntroduceTextThird: "Giới thiệu 3 chưa được điền.",
  noDescription: "Mô tả chưa được điền.",
  noIntroVideo: "Đường dẫn video chưa được điền.",
};

export const introduceTextFirstValidation = Yup.string().required(
  MANAGE_PAGE_ERRORS.noIntroduceTextFirst
);

export const introduceTextSecondValidation = Yup.string().required(
  MANAGE_PAGE_ERRORS.noIntroduceTextSecond
);

export const introduceTextThirdValidation = Yup.string().required(
  MANAGE_PAGE_ERRORS.noIntroduceTextSecond
);

export const descriptionValidation = Yup.string().required(
  MANAGE_PAGE_ERRORS.noDescription
);

export const introVideoValidation = Yup.string().required(
  MANAGE_PAGE_ERRORS.noIntroVideo
);

export const commitValidation = Yup.array().of(
  Yup.object({
    title: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
    imageName: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
  })
);

export const lessonValidation = Yup.array().of(
  Yup.object({
    title: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
    description: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
    videoUrl: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
    videoMobileUrl: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
  })
);

export const reviewValidation = Yup.array().of(
  Yup.object({
    imageName: Yup.string().required("Vui lòng nhập đầy đủ dữ liệu"),
  })
);

export const introductionFormValidationSchema = Yup.object().shape({
  introduceTextFirst: introduceTextFirstValidation,
  introduceTextSecond: introduceTextSecondValidation,
  introduceTextThird: introduceTextThirdValidation,
  description: descriptionValidation,
});

export const commitFormValidationSchema = Yup.object().shape({
  introVideo: introVideoValidation,
  commits: commitValidation,
});

export const lessonFormValidationSchema = Yup.object().shape({
  lessons: lessonValidation,
});

export const reviewFormValidationSchema = Yup.object().shape({
  reviews: reviewValidation,
});
