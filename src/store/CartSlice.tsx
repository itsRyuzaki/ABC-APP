import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccessoriesDetails } from "../interfaces/IAccessoryModels";

interface ICartState {
  items: IAccessoriesDetails[];
}
const initialState: ICartState = {
  items: [],
};

const CartSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAccessoriesDetails>) => {
      state.items = state.items.concat(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: IAccessoriesDetails) => item.accessoryGuid !== action.payload,
      );
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;
