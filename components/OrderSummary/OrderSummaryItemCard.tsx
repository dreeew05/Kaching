import React from 'react';
import { Image, View, Text } from 'react-native';

// INTERFACE
import { OrderSummaryProps } from '../__utils__/interfaces/OrderSummaryProps';

export default function OrderSummaryItemCard(item: OrderSummaryProps) {
  
  const subTotalPrice = item.totalPrice * item.quantity;

  return (
    <View className="flex flex-row items-center bg-slate-200 rounded-xl m-3 p-1 justify-between">
      <Image 
        source={{uri : item.image}}
        className="w-16 h-16 rounded border-4 self-center m-1" 
      />

      <View className="w-16">
        <Text
          className="text-lg font-medium text-gray"
          numberOfLines={1} // limit the number of lines to 1
          ellipsizeMode="tail" // add ellipsis at the end of the truncated text
        >
          {item.name}
        </Text>
      </View>

      <View className="w-16">
        <Text className="text-lg text-gray self-center">P{item.totalPrice.toFixed(2)}</Text>
      </View>

      <View className="w-16">
        <Text className="text-lg text-gray self-center">{item.quantity}</Text>
      </View>

      <View className="w-16">
        <Text className="text-lg font-medium text-gray self-center">
          P{subTotalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
