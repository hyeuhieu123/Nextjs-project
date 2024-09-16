import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist"; // persist(lưu trữ)duex liệu trên local
import createWebStorage from "redux-persist/lib/storage/createWebStorage"; //tạo đối tượng lưu trữ trên localstorange
import appReducer, { IDefaultState } from "./app-slice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const appPersistConfig = {
  key: "app",
  storage: storage,
  whitelist: ["appState"],
}; // cấu hình cho persist

const persistedReducer = persistReducer(appPersistConfig, appReducer);

const rootReducer = combineReducers({
  app: persistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState> & {
  app: IDefaultState;
};
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
///tạo redux store ,lưu trữ vào storange
