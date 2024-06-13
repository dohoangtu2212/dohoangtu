import { IBaseResponse } from "@/models/common";
import axios, { AxiosRequestConfig } from "axios";

export enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export enum Message {
  NetworkError = "Network Error",
  NetworkTimeOut = "timeout of 20000ms exceeded",
}

type ErrorResponse = {
  Error: any;
  IsResponse: boolean;
};

export const replaceBaseUrl = (url: string) => {
  const matchHttps = !!window?.location?.href.match("https");
  return matchHttps ? url : url.replace("https", "http");
};

const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

baseApi.interceptors.request.use(
  async (config: any) => {
    try {
      // const token = await authTokens.getAccessToken();
      // if (token != null && config.headers) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response: any) => {
    const data: any = {
      Data: response.data,
      IsSuccess: true,
      IsError: false,
      Error: null,
    };
    return data;
  },
  (error: any) => {
    if (error.status === 400 && error.data) {
      // toggleNotification({
      //   type: "error",
      //   message: error.data.Message,
      // });
    }

    const errorResponse = handleDataError(error);
    handleError(errorResponse);

    const data: any = {
      Data: null,
      IsSuccess: false,
      IsError: true,
      Error: errorResponse.Error,
    };
    return data;
  }
);

export function getAuthorizationToken() {
  return baseApi.defaults.headers.common.Authorization;
}

export function removeAuthorizationToken() {
  delete baseApi.defaults.headers.common.Authorization;
}

function handleDataError(error: any) {
  let errorResponse: ErrorResponse = {
    Error: error,
    IsResponse: false,
  };
  // Error Response
  if (error.response && error.response.data) {
    errorResponse.Error = error.response.data;
    errorResponse.IsResponse = true;
  }
  // Error Handle
  else if (error.message && error.name === "Error") {
  }

  return errorResponse;
}

const handleError = async (errorResponse: ErrorResponse) => {
  const error = errorResponse.Error;
  const isResponse = errorResponse.IsResponse;
  const { code } = error;
  let isAlert = isResponse;
  let message = error.message;

  switch (code) {
    case StatusCode.InternalServerError: {
      message = "Server đang có lỗi. Vui lòng thử lại sau!";
      // Handle InternalServerError
      break;
    }
    case StatusCode.Forbidden: {
      message = "Bạn không có quyền thực hiện chức năng này!";
      // Handle Forbidden
      break;
    }
    case StatusCode.Unauthorized: {
      isAlert = false;

      //await authTokens.clear();
      // redirect to login page
      // if (window.location.href.indexOf(ROUTE_PATH.LOGIN) === -1) {
      //   window.location.href = ROUTE_PATH.LOGIN;
      // }

      break;
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break;
    }
  }

  if (isAlert && message) {
    // toggleMessage({
    //   type: "error",
    //   message: message || "",
    // });
  }
};

// const initApi = async (): Promise<string | null> => {
//   const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

//   if (token != null) {
//     baseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
//   }

//   return token;
// };

const _request = <T = any, R = IBaseResponse<T>>(
  config: AxiosRequestConfig
): Promise<R> => {
  return baseApi.request(config);
};

const _get = <T = any, R = IBaseResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.get<T, R>(url, config);
};

const _post = <T = any, R = IBaseResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.post<T, R>(url, data, config);
};

const _put = <T = any, R = IBaseResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.put<T, R>(url, data, config);
};

const _delete = <T = any, R = IBaseResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.delete<T, R>(url, config);
};

const api = {
  request: _request,
  get: _get,
  put: _put,
  post: _post,
  delete: _delete,
};

export default api;
