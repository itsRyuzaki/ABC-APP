import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "../services/accessories-service";

export const validateUserCredentials = createAsyncThunk(
  "auth/validateCredentials",
  async () => {
    const response = await postData("/user/validate", {
      userName: "21",
      password: "asd",
    });
    return response;
  }
);
const initialState = {
  isLoggedIn: false,
  allowedModulesAccess: [],
  areCredsValidated: false,
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
      state.areCredsValidated = false;
      state.isLoggedIn = false;
    }),
      builder.addCase(validateUserCredentials.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.areCredsValidated = true;
        state.userData = action.payload;
      });
  },
});

export const { userLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
