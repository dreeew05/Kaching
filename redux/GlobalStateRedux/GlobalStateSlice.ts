import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface hasStartDayProps {
    isStartDay : boolean,
    isDisable : boolean,
}

interface GlobalStateProps {
    category : string[],
    product : string[],
    specificProduct : string[],
    isEditComponent : boolean,
    isDetailedViewLoading : boolean,
    isCategoryViewLoading : boolean,
    storeNameAction : string[],
    hasStartDay : hasStartDayProps,
    // New
    isModifyCategoryLoading : boolean,
}

const initialState : GlobalStateProps = {
    category : [],
    product : [],
    specificProduct : [],
    isEditComponent : true,
    isDetailedViewLoading : true,
    isCategoryViewLoading : true,
    storeNameAction : [],
    hasStartDay : {
        isStartDay : false,
        isDisable : false,
    },
    // New
    isModifyCategoryLoading : true,
}

export const GlobalStateSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategoryAction(state, action : PayloadAction<string>) {
            state.category.push(action.payload)
        },
        addProductAction(state, action : PayloadAction<string>) {
            state.product.push(action.payload)
        },
        addSpecificProductAction(state, action : PayloadAction<string>) {
            state.specificProduct.push(action.payload)
        },
        setIsEditButton(state, action :
            PayloadAction<boolean>) {
                state.isEditComponent = action.payload
        },
        setIsDetailedViewLoading(state, action : 
            PayloadAction<boolean>) {
                state.isDetailedViewLoading = action.payload
        },
        setIsCategoryViewProductLoading(state, action : 
            PayloadAction<boolean>) {
                state.isCategoryViewLoading = action.payload
        },
        addStoreNameAction(state, action : 
            PayloadAction<string>) {
                state.storeNameAction.push(action.payload)
        },
        setHasStartDay(state, action :
            PayloadAction<hasStartDayProps>) {
                state.hasStartDay = action.payload
        },
        // New
        setIsModifyCategoryLoading(state, action :
            PayloadAction<boolean>) {
                state.isModifyCategoryLoading = action.payload
        }
    }
});

export const { addCategoryAction, addProductAction,
    addSpecificProductAction, setIsEditButton, 
    setIsDetailedViewLoading, addStoreNameAction,
    setIsCategoryViewProductLoading, setHasStartDay,
    setIsModifyCategoryLoading } = GlobalStateSlice.actions;

export default GlobalStateSlice.reducer;