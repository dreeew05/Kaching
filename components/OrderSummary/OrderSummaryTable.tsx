import React from 'react';
import { View, Text } from 'react-native';

export default function OrderSummaryTable() {
  return (
    <View className="mt-5 items-end">
      <View className="flex flex-row">
          <Text className=" text-gray text-base self-center mr-7">Price</Text>
          <Text className=" text-gray text-base self-center mr-5">Quantity</Text>
          <Text className=" text-gray text-base self-center mr-5 ">Subtotal</Text>
      </View>
    </View>
  );
}
