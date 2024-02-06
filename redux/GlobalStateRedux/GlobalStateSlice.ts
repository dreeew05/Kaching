import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface hasStartDayProps {
  isStartDay: boolean;
  isDisable: boolean;
}

interface GlobalStateProps {
  specificProduct: string[];
  isEditComponent: boolean;
  isDetailedViewLoading: boolean;
  isCategoryViewLoading: boolean;
  storeNameAction: string[];
  hasStartDay: hasStartDayProps;
  // New
  isModifyCategoryLoading: boolean;
  categoryModifiedActions: string[];
}

const initialState: GlobalStateProps = {
  specificProduct: [],
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
};

export const GlobalStateSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addSpecificProductAction(state, action: PayloadAction<string>) {
      state.specificProduct.push(action.payload);
    },
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
  },
});

export const {
  addSpecificProductAction,
  setIsEditButton,
  setIsDetailedViewLoading,
  addStoreNameAction,
  setIsCategoryViewProductLoading,
  setHasStartDay,
  setIsModifyCategoryLoading,
  setCategoryModifedActions,
} = GlobalStateSlice.actions;

export default GlobalStateSlice.reducer;
