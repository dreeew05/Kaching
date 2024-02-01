import { RootState } from "../Store";

export const selectCategory = (state : RootState) => state.globalState.category;
export const selectProduct = (state : RootState) => state.globalState.product;
export const selectSpecificProduct = (state : RootState) => state.globalState.specificProduct;
export const selectIsEditComponent = (state : RootState) => state.globalState.isEditComponent;
export const selectIsEditDetailedViewLoading = (state : RootState) => state.globalState.isDetailedViewLoading;
export const selectIsCategoryViewLoading = (state : RootState) => state.globalState.isCategoryViewLoading;
export const selectStoreNameAction = (state : RootState) => state.globalState.storeNameAction;
export const selectHasStartDay = (state : RootState) => state.globalState.hasStartDay;
export const selectIsModifyCategoryLoading = (state : RootState) => state.globalState.isModifyCategoryLoading;