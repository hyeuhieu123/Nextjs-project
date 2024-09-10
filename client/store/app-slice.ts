import { createSlice } from '@reduxjs/toolkit';

export type IDefaultState = {
    activeSearch: boolean
};

const initialState: IDefaultState = {
    activeSearch: false
};
export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setActiveSearch: (state, action) => {
            state.activeSearch = action.payload;
        }
    },
});
export const {
    setActiveSearch
} = appSlice.actions;
export default appSlice.reducer;
