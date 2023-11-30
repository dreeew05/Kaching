import React from 'react';
import { ScrollView, View } from 'react-native';

// CONSTANT DATA
import constantProducts from '../../constants/Products';

// INTERFACE
import { OrderSummaryListProps } from '../__utils__/interfaces/OrderSummaryProps';
import OrderSummaryItemCard from './OrderSummaryItemCard';

const OrderSummaryItemList: React.FC<OrderSummaryListProps> = ({ cart }) => {
  return (
    <ScrollView>
      {cart.map((item) => {
        item.image = constantProducts[item.id];
        return (
          <View key={item.id}>
            <OrderSummaryItemCard
              id={item.id}
              name={item.name}
              image={item.image}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default OrderSummaryItemList;
