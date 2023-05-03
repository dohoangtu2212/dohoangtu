import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import dyntubeApis from "@/store/apis/dyntube";
import userApis from "@/store/apis/user";
import { userReducer } from "@/store/slices/user";
import dyntubeUploadApis from "@/store/apis/dyntubeUpload";

const reducer = combineReducers({
  [dyntubeApis.reducerPath]: dyntubeApis.reducer,
  [userApis.reducerPath]: userApis.reducer,
  [dyntubeUploadApis.reducerPath]: dyntubeUploadApis.reducer,
  user: userReducer,
});

const makeStore = () =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([
        dyntubeApis.middleware,
        userApis.middleware,
        dyntubeUploadApis.middleware,
      ]),
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof reducer>;
