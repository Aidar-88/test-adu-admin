import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/reducers/auth/auth.slice";
import shopApi from "./shop-rtk/shopApi";
import productApi from "./product-rtk/productApi";
import orderApi from "./order-rtk/orderApi";
import bannerApi from "./banner-rtk/bannerApi";
import notificationApi from "./notification-rtk/notificationApi";
import tagApi from "./tags-rtk/tagApi";
import categoryApi from "./category-rtk/categoryApi";
import roleApi from "./role-rtk/roleApi";
import userApi from "./user-rtk/userApi";
import specApi from "./spec-rtk/specApi";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const AuthPersistConfig = {
  key: "auth",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(AuthPersistConfig, authReducer),
  [shopApi.reducerPath]: shopApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [specApi.reducerPath]: specApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      shopApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      bannerApi.middleware,
      notificationApi.middleware,
      tagApi.middleware,
      categoryApi.middleware,
      roleApi.middleware,
      specApi.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
