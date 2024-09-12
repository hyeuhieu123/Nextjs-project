import { createSlice } from "@reduxjs/toolkit";

import { IProduct } from "@/server/_types/product-type";

export type IDefaultState = {
  activeSearch: boolean;
  cartLocalStorage:
    | {
        product: IProduct;
        quantity: number;
      }[]
    | [];
};

const initialState: IDefaultState = {
  activeSearch: false,
  cartLocalStorage: [],
};
export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setActiveSearch: (state, action) => {
      state.activeSearch = action.payload;
    },
    setCartLocalStorage: (state, action) => {
      state.cartLocalStorage = action.payload;
    },
  },
});
export const { setActiveSearch, setCartLocalStorage } = appSlice.actions;
export default appSlice.reducer;
