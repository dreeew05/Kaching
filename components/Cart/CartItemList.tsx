import React from 'react';
import { ScrollView, View } from 'react-native';

// CONSTANT DATA
import constantProducts from '../../constants/Products';

// COMPONENT
import CartItemCard from './CartItemCard';

// INTERFACE
import { CartProps } from '../__utils__/interfaces/CartItemProps';

const CartItemList: React.FC<CartProps> = ({ cart }) => {
  return (
    <ScrollView>
      {cart.map((item) => {
        item.image = constantProducts[item.id];
        return (
          <View key={item.id}>
            <CartItemCard
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

export default CartItemList;
