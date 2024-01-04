import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalStateProps {
    category : string[],
    product : string[]
}

const initialState : GlobalStateProps = {
    category : [],
    product : []
    // product : null
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
        }
        // setProductAction(state, action : PayloadAction<string>) {
        //     state.product = action.payload
        // }
    }
});

export const { addCategoryAction, addProductAction } = GlobalStateSlice.actions;
export default GlobalStateSlice.reducer;