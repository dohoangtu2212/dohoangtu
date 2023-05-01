import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IGetVideosResponse } from "@/types/dyntube";

const dyntubeApis = createApi({
  reducerPath: "dyntube",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/dyntube",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getVideos: build.query<IGetVideosResponse, void>({
      query: () => {
        return {
          url: "/videos",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetVideosQuery } = dyntubeApis;

export default dyntubeApis;
