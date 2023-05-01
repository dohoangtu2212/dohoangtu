import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import dyntubeApis from "@/store/apis/dyntube";

const makeStore = () =>
  configureStore({
    reducer: {
      [dyntubeApis.reducerPath]: dyntubeApis.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([dyntubeApis.middleware]),
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
