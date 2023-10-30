import { useSelector } from "react-redux";
import { selectCart } from "../../redux/CartSelectors";
import CartItemList from "./CartItemList";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/Store";

export default function CartItemsGenerator() {

    const cartState = useSelector((state : RootState) => state.cart.cart);

    return(
        <CartItemList
            cart={cartState}
        />
    )

}