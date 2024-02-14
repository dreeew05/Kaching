import { AppDispatch } from '../../../redux/Store';
import { AddToCartModalPropsMethods } from './AddToCartModalPropsMethods';
import { BaseItemProps } from './BaseItemProps';

export interface AddToCartInterface
  extends AddToCartModalPropsMethods {
  quantity: number;
  itemState: BaseItemProps | undefined;
  product: BaseItemProps;
  dispatch: AppDispatch;
}
