import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/CartRedux/CartSelectors';
import OrderSummaryItemList from './OrderSummaryItemList';

export default function OrderSummaryGenerator() {
  const cartState = useSelector(selectCart);

  const orderSummary = cartState.cart.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    totalPrice: item.price,
    image: item.image,
  }));

  return <OrderSummaryItemList cart={orderSummary} />;
}
