import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import dyntubeApis from "@/store/apis/dyntube";
import userApis from "@/store/apis/user";
import dbApis from "@/store/apis/db";
import { userReducer } from "@/store/slices/user";
import { cartReducer } from "@/store/slices/cart";
import dyntubeUploadApis from "@/store/apis/dyntubeUpload";

const reducer = combineReducers({
  [dyntubeApis.reducerPath]: dyntubeApis.reducer,
  [userApis.reducerPath]: userApis.reducer,
  [dyntubeUploadApis.reducerPath]: dyntubeUploadApis.reducer,
  [dbApis.reducerPath]: dbApis.reducer,
  user: userReducer,
  cart: cartReducer,
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
        dbApis.middleware,
      ]),
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof reducer>;
