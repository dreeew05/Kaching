import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface hasStartDayProps {
  isStartDay: boolean;
  isDisable: boolean;
}

interface GlobalStateProps {
  isEditComponent: boolean;
  isDetailedViewLoading: boolean;
  isCategoryViewLoading: boolean;
  storeNameAction: string[];
  hasStartDay: hasStartDayProps;
  // New
  isModifyCategoryLoading: boolean;
  categoryModifiedActions: string[];
  productModifiedActions: string[];
  isModifyProductLoading: boolean;
}

const initialState: GlobalStateProps = {
  isEditComponent: true,
  isDetailedViewLoading: true,
  isCategoryViewLoading: true,
  storeNameAction: [],
  hasStartDay: {
    isStartDay: false,
    isDisable: false,
  },
  // New
  isModifyCategoryLoading: true,
  categoryModifiedActions: [],
  productModifiedActions: [],
  isModifyProductLoading: true,
};

export const GlobalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setIsEditButton(state, action: PayloadAction<boolean>) {
      state.isEditComponent = action.payload;
    },
    setIsDetailedViewLoading(state, action: PayloadAction<boolean>) {
      state.isDetailedViewLoading = action.payload;
    },
    setIsCategoryViewProductLoading(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.isCategoryViewLoading = action.payload;
    },
    addStoreNameAction(state, action: PayloadAction<string>) {
      state.storeNameAction.push(action.payload);
    },
    setHasStartDay(state, action: PayloadAction<hasStartDayProps>) {
      state.hasStartDay = action.payload;
    },
    // New
    setIsModifyCategoryLoading(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.isModifyCategoryLoading = action.payload;
    },
    setCategoryModifedActions(state, action: PayloadAction<string>) {
      state.categoryModifiedActions.push(action.payload);
    },
    setProductModifiedActions(state, action: PayloadAction<string>) {
      state.productModifiedActions.push(action.payload);
    },
    setIsModifyProductLoading(state, action: PayloadAction<boolean>) {
      state.isModifyProductLoading = action.payload;
    },
  },
});

export const {
  setIsEditButton,
  setIsDetailedViewLoading,
  addStoreNameAction,
  setIsCategoryViewProductLoading,
  setHasStartDay,
  setIsModifyCategoryLoading,
  setCategoryModifedActions,
  setProductModifiedActions,
  setIsModifyProductLoading,
} = GlobalStateSlice.actions;

export default GlobalStateSlice.reducer;
