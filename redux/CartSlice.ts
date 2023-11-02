import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItemProps, CartProps } from '../components/__utils__/interfaces/CartItemProps'

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
            else if(!itemExists && action.payload.quantity > 0) {
                state.cart.push(action.payload)
            }
        },
        removeFromCart(state, action : PayloadAction<number>) {
            state.cart = state.cart.filter(
                item => item.id !== action.payload
            )
        },
        updateItemQuantity(state, action : PayloadAction<IdQuantityPair>) {
            const item = state.cart.find(
                item => item.id === action.payload.id
            );
            if(item) {
                item.quantity = action.payload.quantity
            }
        },
        clearCart(state) {
            state.cart = []
        } 
    }
})

export const { addToCart, removeFromCart,
    updateItemQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;