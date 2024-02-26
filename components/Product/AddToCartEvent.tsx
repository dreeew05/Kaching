import { addToCart } from '../../redux/CartRedux/CartSlice';
import { AddToCartInterface } from '../__utils__/interfaces/AddToCartInterface';

export const addToCartEvent = (item: AddToCartInterface) => {
  if (item.quantity > 0) {
    item.dispatch(
      addToCart({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        category: item.product.category,
      }),
    );
    item.showAddModal(true);
  } else {
    item.showAddQuantityModal(true);
  }
};
