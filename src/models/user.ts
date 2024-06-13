import { IBasePagingReq } from "./common";

export interface IGetPagingReq extends IBasePagingReq {
  role?: string;
}
