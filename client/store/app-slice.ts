import { createSlice } from "@reduxjs/toolkit";

import { IProduct } from "@/server/_types/product-type";
//định hình kiểu dữ liệu
export type IDefaultState = {
  activeSearch: boolean;
  cartLocalStorage:
    | {
        product: IProduct;
        quantity: number;
      }[]
    | [];
};
//set giá trị mặc định
const initialState: IDefaultState = {
  activeSearch: false,
  cartLocalStorage: [],
};
// tạo slice quản lý state
export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setActiveSearch: (state, action) => {
      state.activeSearch = action.payload;
      // Nhận giá trị từ action.payload và cập nhật trạng thái của activeSearch.
    },
    setCartLocalStorage: (state, action) => {
      state.cartLocalStorage = action.payload; //
    },
  },
});
export const { setActiveSearch, setCartLocalStorage } = appSlice.actions;
export default appSlice.reducer;
//===> quản lý trạng thái
