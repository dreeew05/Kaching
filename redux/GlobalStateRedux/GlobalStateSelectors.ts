import { RootState } from '../Store';

export const selectIsEditComponent = (state: RootState) =>
  state.globalState.isEditComponent;
export const selectIsEditDetailedViewLoading = (state: RootState) =>
  state.globalState.isDetailedViewLoading;
export const selectIsCategoryViewLoading = (state: RootState) =>
  state.globalState.isCategoryViewLoading;
export const selectStoreNameAction = (state: RootState) =>
  state.globalState.storeNameAction;
export const selectHasStartDay = (state: RootState) =>
  state.globalState.hasStartDay;
export const selectIsModifyCategoryLoading = (state: RootState) =>
  state.globalState.isModifyCategoryLoading;
export const selectCategoryModifiedActions = (state: RootState) =>
  state.globalState.categoryModifiedActions;
export const selectProductModifiedActions = (state: RootState) =>
  state.globalState.productModifiedActions;
export const selectIsModifyProductLoading = (state: RootState) =>
  state.globalState.isModifyProductLoading;
export const selectStartDayTrigger = (state: RootState) =>
  state.globalState.startDayTrigger;
