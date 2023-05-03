import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dyntubeUploadApis = createApi({
  reducerPath: "dyntube-upload",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upload.dyntube.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_DYNTUBE_API_TOKEN}`
      );
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (build) => ({
    uploadVideo: build.mutation<any, { video: File }>({
      query: ({ video }) => {
        const formData = new FormData();
        formData.append("file", video);
        formData.append(
          "projectId",
          process.env.NEXT_PUBLIC_DYNTUBE_PROJECT_ID as string
        );
        return {
          url: "/videos",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const { useUploadVideoMutation } = dyntubeUploadApis;

export default dyntubeUploadApis;
