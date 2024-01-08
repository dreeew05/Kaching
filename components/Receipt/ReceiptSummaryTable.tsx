import React from 'react';
import { View, Text } from 'react-native';

export default function ReceiptSummaryTable() {
  return (
    <View className="mt-5 flex-1 self-stretch">
      <View className='flex-row self-center'>
        <View className="flex flex-row self-center">
          <Text className=" text-zinc-500 mr-12 text-base self-center font-semibold ">Quantity</Text>
          <Text className=" text-zinc-500 mr-12 text-base self-center font-semibold">Item</Text>
          <Text className=" text-zinc-500 mr-10 text-base self-center font-semibold">   Price</Text>
          <Text className=" text-zinc-500 text-base self-center font-semibold">Subtotal</Text>        
        </View>
      </View>
        <Text className=" text-zinc-500 text-base self-center">________________________________________________</Text>
    </View>
  );
}
