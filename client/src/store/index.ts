import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import RootReducer from "./rootReducers";

const store = configureStore({
  reducer: RootReducer,
});

export type AppState = ReturnType<typeof RootReducer>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppState = <T extends (state: AppState) => any>(
  selector: T
): ReturnType<T> => useSelector(selector);

export default store;
