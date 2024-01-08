import React from 'react';
import ReceiptItemCard from './ReceiptItemCard';
import { CartProps } from '../__utils__/interfaces/CartItemProps';

const ReceiptItemList: React.FC<CartProps> = ({ cart }) => {

  // console.log(cart)

  return (
      cart.map((item) => {
        return (
          <ReceiptItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            category={item.category}
            quantity={item.quantity}
            price={item.price}
          />
        );
      })
  );
};

export default ReceiptItemList;
