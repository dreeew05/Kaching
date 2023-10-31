import { useSelector } from "react-redux";
import { selectCart } from "../../redux/CartSelectors";
import CartItemList from "./CartItemList";

export default function CartItemsGenerator() {

    const cartState = useSelector(selectCart);

    return(
        <CartItemList
            cart={cartState.cart}
        />
    )

}