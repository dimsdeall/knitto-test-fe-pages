import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { todoApi } from "./api/todoApi";
import pageReducer from "./reducer/pageReducer";

export const store = () =>
  configureStore({
    reducer: {
        page: pageReducer,
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: (gDM) => gDM().concat(todoApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });