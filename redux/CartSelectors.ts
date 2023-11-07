import { RootState } from "./Store";

export const selectCart = (state : RootState) => state.cart;
export const selectCartItems = (state : RootState) => state.cart.cart;
export const selectCartItem = (state : RootState, id : number) =>
    state.cart.cart.find(
        item => item.id == id
    )
export const selectCartTotalPrice = (state : RootState) => state.cart.cart.reduce(
    (totalPrice, currentObject) => {
        return totalPrice +  (
            currentObject.quantity * currentObject.price
        )
    }, 0
)