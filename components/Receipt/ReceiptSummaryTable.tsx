import React from 'react';
import { View, Text } from 'react-native';

export default function ReceiptSummaryTable() {
  return (
    <View className="mt-5 flex-1 self-stretch">
      <View className='self-center'>
        <View className="flex-row">
          <Text className=" text-zinc-500 w-16 text-base self-center font-semibold "> Qty</Text>
          <Text className=" text-zinc-500 w-32 text-base self-center font-semibold">   Item Name</Text>
          <Text className=" text-zinc-500 w-16 text-base self-center font-semibold">   Price</Text>
          <Text className=" text-zinc-500 w- text-base self-center font-semibold">    Amount</Text>
        </View>
      </View>
        <Text className=" text-zinc-500 text-base self-center">________________________________________________</Text>
    </View>
  );
}
