import { userSlice } from "./Features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { taskSlice } from "./Features/taskSlice";

export const store = configureStore({
  reducer: {
    person: userSlice.reducer,
    task: taskSlice.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;