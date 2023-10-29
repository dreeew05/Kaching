import { RootState } from "./Store";

export const selectCart = (state : RootState) => state.cart;
export const selectCartItems = (state : RootState) => state.cart.cart;