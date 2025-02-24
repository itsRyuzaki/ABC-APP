import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";
import AccessorySliceReducer from "./AccesorySlice";

export const AppStore = configureStore({
  reducer: {
    authorization: AuthSliceReducer,
    accessoryDetails: AccessorySliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
