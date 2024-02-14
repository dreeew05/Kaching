import { BaseItemProps } from './BaseItemProps';

export interface CartItemProps extends BaseItemProps {
  quantity: number;
}

export interface CartProps {
  cart: CartItemProps[];
}
