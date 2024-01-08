import React from 'react';
import { ScrollView, View } from 'react-native';
import ReceiptItemCard from './ReceiptItemCard';
import { CartProps } from '../__utils__/interfaces/CartItemProps';

const ReceiptItemList: React.FC<CartProps> = ({ cart }) => {

  console.log(cart)

  return (
    <ScrollView className="border-2 rounded m-5">
      {cart.map((item) => {
        return (
          <View key={item.id}>
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
