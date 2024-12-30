import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../services/accessories-service";
import { RawApiResponse } from "../interfaces/IApiResponse";
import { IUserData } from "../interfaces/IApiModels";
import { ENDPOINTS } from "../config/endpoints";

export const validateUserCredentials = createAsyncThunk(
  "auth/validateCredentials",
  async () => {
    const response = await fetchData<IUserData>(ENDPOINTS.validateCreds);
    return response;
  }
);

interface IAuthState {
  isLoggedIn: boolean;
  allowedModulesAccess: string[];
  areCredsValidated: boolean;
  userData: IUserData | null;
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
    userLogin: (state, action: PayloadAction<RawApiResponse<IUserData>>) => {
      state.isLoggedIn = true;
      state.userData = action.payload.data;
      state.allowedModulesAccess = action.payload.data?.accessibleModules ?? [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateUserCredentials.pending, (state) => {
      state.areCredsValidated = false;
      state.isLoggedIn = false;
    }),
      builder.addCase(
        validateUserCredentials.fulfilled,
        (state, action: PayloadAction<RawApiResponse<IUserData>>) => {
          state.isLoggedIn = action.payload.success;
          state.areCredsValidated = true;
          state.userData = action.payload.data;
        }
      );
  },
});

export const { userLogout, userLogin } = AuthSlice.actions;
export default AuthSlice.reducer;
