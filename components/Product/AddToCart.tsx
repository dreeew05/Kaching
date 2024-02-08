import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import { addToCart } from '../../redux/CartRedux/CartSlice';
import { AppDispatch } from '../../redux/Store';

interface AddToCartInterface {
  quantity: number;
  itemState: BaseItemProps | undefined;
  product: BaseItemProps;
  dispatch: AppDispatch;
  showAddModal: (isClose: boolean) => void;
  showAddQuantityModal: (isClose: boolean) => void;
  showItemInCartModal: (isClose: boolean) => void;
}

export const addToCartEvent = (item: AddToCartInterface) => {
  // TODO: Create custom alert component
  if (item.itemState == undefined) {
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
  } else {
    item.showItemInCartModal(true);
  }
};
