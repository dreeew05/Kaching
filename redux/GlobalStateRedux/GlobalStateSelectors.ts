import { RootState } from "../Store";

export const selectCategory = (state : RootState) => state.globalState.category;
export const selectProduct = (state : RootState) => state.globalState.product;
export const selectSpecificProductTemp = (state : RootState) => state.globalState.specificProductTemp;
export const selectSpecificProduct = (state : RootState) => state.globalState.specificProduct;
export const selectIsEditComponent = (state : RootState) => state.globalState.isEditComponent;