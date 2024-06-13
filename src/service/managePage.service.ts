import { IBaseResponse } from "@/models/common";
import ApiEndpoints from "@/store/apis/remote/apiEndpoints";
import api from "@/store/apis/remote/baseApi";
import { IManagePageReq, IManagePageRes } from "@/types/managePage";
import { IBaseAuthReq } from "@/types/user";

const API_MANAGE_PAGE = ApiEndpoints.MANAGE_PAGE;

const get = (record: IBaseAuthReq): Promise<IBaseResponse<IManagePageRes>> => {
  return api.get(API_MANAGE_PAGE.GET.url, { params: record });
};

const updateIntroduction = (
  record: IManagePageReq
): Promise<IBaseResponse<IManagePageRes>> => {
  return api.post(API_MANAGE_PAGE.UPDATE_INTRODUCTION.url, record);
};

const updateLesson = (
  record: IManagePageReq
): Promise<IBaseResponse<IManagePageRes>> => {
  return api.post(API_MANAGE_PAGE.UPDATE_LESSON.url, record);
};

const updateReview = (
  record: IManagePageReq
): Promise<IBaseResponse<IManagePageRes>> => {
  return api.post(API_MANAGE_PAGE.UPDATE_REVIEW.url, record);
};

const ManagePageService = {
  get,
  updateIntroduction,
  updateLesson,
  updateReview,
};

export default ManagePageService;
