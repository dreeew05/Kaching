import { useSelector } from "react-redux";
import { selectCart } from "../../redux/CartSelectors";
import OrderSummaryItemList from "./OrderSummaryItemList";

export default function OrderSummaryGenerator() {

    const cartState = useSelector(selectCart)

    const orderSummary = cartState.cart.map(
        (item) => ({
            id : item.id,
            name : item.name,
            quantity : item.quantity,
            totalPrice : item.quantity * item.price,
            image : item.image
        })
    )

    return(
        <OrderSummaryItemList
            cart={orderSummary}
        />
    )
}