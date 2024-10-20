import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const validateUserCredentials = createAsyncThunk(
  "auth/validateCredentials",
  (userCreds) => {
    return {};
  }
);
const initialState = {
  isLoggedIn: false,
  allowedModulesAccess: [],
  userApiResolved: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateUserCredentials.pending, (state, action) => {
      state.userApiResolved = false;
      state.isLoggedIn = false;
    }),
      builder.addCase(validateUserCredentials.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userApiResolved = true;
        state.userData = action.payload;
      });
  },
});

export const { userLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
