import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SpecificProductProps {
    id : number,
    action : string
}

interface GlobalStateProps {
    category : string[],
    product : string[],
    specificProductTemp : string[],
    specificProduct : SpecificProductProps,
    isEditComponent : boolean
}

const initialState : GlobalStateProps = {
    category : [],
    product : [],
    specificProductTemp : [],
    specificProduct : {
        id : 0,
        action : ''
    },
    isEditComponent : true
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
            state.specificProductTemp.push(action.payload)
        },
        setSpecificProductAction(state, action : 
            PayloadAction<SpecificProductProps>) {
            state.specificProduct = action.payload
        },
        setIsEditComponent(state, action :
            PayloadAction<boolean>) {
                state.isEditComponent = action.payload
            }
    }
});

export const { addCategoryAction, addProductAction,
   addSpecificProductAction, setSpecificProductAction,
   setIsEditComponent } = GlobalStateSlice.actions;

export default GlobalStateSlice.reducer;