import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postData } from "../services/accessories-service";
import { ApiResponse } from "../interfaces/IApiResponse";
import { IUserApiPayload, IUserData } from "../interfaces/IApiModels";

export const validateUserCredentials = createAsyncThunk(
  "auth/validateCredentials",
  async () => {
    const response = await postData<IUserApiPayload, IUserData>(
      "/user/validate",
      {
        userName: "21",
        password: "asd",
      }
    );
    return response;
  }
);

interface IAuthState {
  isLoggedIn: boolean;
  allowedModulesAccess: never[];
  areCredsValidated: boolean;
  userData: ApiResponse<IUserData> | null;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  allowedModulesAccess: [],
  areCredsValidated: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateUserCredentials.pending, (state, action) => {
      state.areCredsValidated = false;
      state.isLoggedIn = false;
    }),
      builder.addCase(
        validateUserCredentials.fulfilled,
        (state, action: PayloadAction<ApiResponse<IUserData>>) => {
          state.isLoggedIn = true;
          state.areCredsValidated = true;
          state.userData = action.payload;
        }
      );
  },
});

export const { userLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
