import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccessoriesDetails } from "../interfaces/IAccessoryModels";


interface IAccessoryState {
  details: Partial<IAccessoriesDetails> | null;
}
const initialState: IAccessoryState = {
  details: null,
};

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
});

export const { saveDetails, clearDetails } = AccessorySlice.actions;
export default AccessorySlice.reducer;
