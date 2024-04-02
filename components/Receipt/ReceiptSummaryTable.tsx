import React from 'react';
import { Text, View } from 'react-native';

export default function ReceiptSummaryTable() {
  return (
    <View className="flex-1 flex-row items-center justify-between w-12/12 self-center  border-b-2 mb-5">
      <View className="self-center flex-1 flex ">
        <View className="flex-row space-x-2 pb-4">
          <Text className="flex-1  text-zinc-600 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-semibold w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 ">
            {' '}
            Qty
          </Text>
          <Text className="flex-1 text-zinc-600 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-semibold  w-2/6 sm:w-2/6 md:w-2/6 lg:w-2/6">
            {' '}
            Item
          </Text>
          <Text className="flex-1 text-zinc-600 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-semibold  w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6">
            {' '}
            Price
          </Text>
          <Text className="flex-1 bg text-zinc-600 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-semibold w-2/6 sm:w-1/6 md:w-2/6 lg:w-2/6">
            {' '}
            Amount
          </Text>
        </View>
      </View>
    </View>
  );
}
