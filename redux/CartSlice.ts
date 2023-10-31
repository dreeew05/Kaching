import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItemProps, CartProps } from '../components/utils/interfaces/CartItemProps'

interface IdQuantityPair {
    id : number,
    quantity : number
}

const initialState : CartProps = {
    cart : []
}

export const CartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        addToCart(state, action : PayloadAction<CartItemProps>) {
            const itemExists = state.cart.find(
                item => item.id === action.payload.id
            );
            if(itemExists) {
                itemExists.quantity = action.payload.quantity;
            }
            else {
                state.cart.push(action.payload)
            }
        },
        removeFromCart(state, action : PayloadAction<number>) {
            state.cart = state.cart.filter(
                item => item.id !== action.payload
            )
        },
        updateItemQuantity(state, action : PayloadAction<IdQuantityPair>) {
            state.cart = state.cart.map(
                item => item.id == action.payload.id ? {
                    ...item,
                    quantity : action.payload.quantity
                } : item
            )
        },
        clearCart(state) {
            state.cart = []
        } 
    }
})

export const { addToCart, removeFromCart,
    updateItemQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;