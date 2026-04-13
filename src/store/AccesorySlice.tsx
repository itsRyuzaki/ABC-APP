import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccessoriesDetails } from "../interfaces/IAccessoryModels";
import { postData } from "../services/accessories-service";
import { ENDPOINTS } from "../config/endpoints";
import { RawApiResponse } from "../interfaces/IApiResponse";

interface IAccessoryState {
  details: IAccessoriesDetails | null;
  hasError: boolean;
}
const initialState: IAccessoryState = {
  details: null,
  hasError: false,
};

export const fetchAccessoryDetails = createAsyncThunk(
  "Accessory/details",
  async (data: { type: string; id: string | undefined }) => {
    const response = await postData<{ type: string }, IAccessoriesDetails>(
      `${ENDPOINTS.accessoryDetails}/${data.id}`,
      { type: data.type },
    );
    return response;
  },
);

const AccessorySlice = createSlice({
  name: "accessoryDetails",
  initialState,
  reducers: {
    saveDetails: (state, action: PayloadAction<IAccessoryState>) => {
      state.details = action.payload.details;
    },
    clearDetails: (state) => {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAccessoryDetails.fulfilled,
        (state, action: PayloadAction<RawApiResponse<IAccessoriesDetails>>) => {
          state.hasError = !action.payload.success;
          state.details = action.payload.data;
        },
      )
      .addCase(fetchAccessoryDetails.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { saveDetails, clearDetails } = AccessorySlice.actions;
export default AccessorySlice.reducer;
