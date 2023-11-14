import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../redux/CartSelectors";
import { OrderSummaryProps } from "../__utils__/interfaces/OrderSummaryProps";
import OrderSummaryItemCard from "../OrderSummary/OrderSummaryItemCard";

export default function ServiceFee() {
    const totalPrice = useSelector(selectCartTotalPrice);

    const serviceFee : OrderSummaryProps = {
        id : -1,
        name: "Service Fee",
        quantity: 1,
        totalPrice: totalPrice * 0.25,
        image : require('../../assets/icons/icon.png')
    }

    return(
        <OrderSummaryItemCard 
            id={serviceFee.id} 
            name={serviceFee.name} 
            quantity={serviceFee.quantity} 
            totalPrice={serviceFee.totalPrice}
            image={serviceFee.image}        
        />
    )
}