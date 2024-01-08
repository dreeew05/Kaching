import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalStateProps {
    category : string[],
    product : string[],
    specificProduct : string[],
    isEditComponent : boolean,
    isDetailedViewLoading : boolean,
    isCategoryViewLoading : boolean,
    storeNameAction : string[],
    hasStartDay : boolean
}

const initialState : GlobalStateProps = {
    category : [],
    product : [],
    specificProduct : [],
    isEditComponent : true,
    isDetailedViewLoading : true,
    isCategoryViewLoading : true,
    storeNameAction : [],
    hasStartDay : false
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
        setIsEditComponent(state, action :
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
            PayloadAction<boolean>) {
                state.hasStartDay = action.payload
        },
    }
});

export const { addCategoryAction, addProductAction,
   addSpecificProductAction, setIsEditComponent, 
   setIsDetailedViewLoading, addStoreNameAction,
   setIsCategoryViewProductLoading, setHasStartDay } = GlobalStateSlice.actions;

export default GlobalStateSlice.reducer;