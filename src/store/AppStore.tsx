import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";

export const AppStore = configureStore({
  reducer: {
    authorization: AuthSliceReducer,
  },
});
