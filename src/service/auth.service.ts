import { IBaseResponse } from "@/models/common";
import ApiEndpoints from "@/store/apis/remote/apiEndpoints";
import api from "@/store/apis/remote/baseApi";
import { IBaseUser, ICreateUser } from "@/types/user";

const API_AUTH = ApiEndpoints.AUTH;

const register = (record: ICreateUser): Promise<IBaseResponse<IBaseUser>> => {
  return api.post(API_AUTH.REGISTER.url, record);
};

const AuthService = {
  register,
};

export default AuthService;
