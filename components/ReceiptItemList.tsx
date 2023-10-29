import React from 'react';
import { ScrollView, View } from 'react-native';

// CONSTANT DATA
import constantProducts from '../constants/Products';

// COMPONENT
import ReceiptItemCard from './ReceiptItemCard';

// INTERFACE
import { CartProps } from './interfaces/CartItemProps';

interface CartListProps {
  items: CartProps[];
}

const ReceiptItemList: React.FC<CartListProps> = ({ items }) => {
  return (
    <ScrollView className='border-2 rounded m-5'>
      {items.map((item) => {
        item.image = constantProducts[item.id];
        return (
          <View  key={item.id}>
            <ReceiptItemCard
              id={item.id}
              name={item.name}
              image={item.image}
              category={item.category}
              quantity={item.quantity}
              price={item.price}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ReceiptItemList;
