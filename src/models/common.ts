export interface IBaseResponse<T> {
  data: T | null;
  success: boolean;
  message: string | null;
  error: any;
  statusCode: number;
}

export interface IBasePagingReq {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
}

export interface IBasePagingRes<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export function BaseResponseSuccess<T>(data: T): IBaseResponse<T> {
  return {
    data: data,
    success: true,
    message: null,
    error: null,
    statusCode: 200,
  };
}

export function BaseResponseMessageSuccess<T>(
  message: string
): IBaseResponse<T> {
  return {
    data: null,
    success: true,
    message: message,
    error: null,
    statusCode: 200,
  };
}

export function BaseResponseError<T>(
  error: any,
  statusCode?: number
): IBaseResponse<T> {
  return {
    data: null,
    success: false,
    message: null,
    error: error,
    statusCode: statusCode ?? 500,
  };
}

export function BaseResponseMessageError<T>(
  message: string,
  statusCode?: number
): IBaseResponse<T> {
  return {
    data: null,
    success: false,
    message: message,
    error: null,
    statusCode: statusCode ?? 500,
  };
}
