import React from 'react';
import { View, Text } from 'react-native';

export default function OrderSummaryTable() {
  return (
    <View className="mt-5 items-end">
      <View className="flex flex-row">
        <Text className=" text-gray text-base self-center w-16 mr-5 font-semibold">Price</Text>
        <Text className=" text-gray text-base self-center w-12 mr-2 font-semibold">Qty</Text>
        <Text className=" text-gray text-base self-center w-20 mr-2 font-semibold">Subtotal</Text>
      </View>
    </View>
  );
}
