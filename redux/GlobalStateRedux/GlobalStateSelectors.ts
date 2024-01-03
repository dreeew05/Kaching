import { RootState } from "../Store";

export const selectCategory = (state : RootState) => state.globalState.category;
export const selectProduct = (state : RootState) => state.globalState.product;