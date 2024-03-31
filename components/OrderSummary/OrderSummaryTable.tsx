import React from 'react';
import { Image, Text, View } from 'react-native';

export default function OrderSummaryTable() {
  return (
    <View className="flex flex-row items-center rounded-xl m-3 p-1 justify-between">
      <Image
        source={{}}
        className=" w-12 sm:w-12 md:w-16 lg:w-20 rounded border-4 self-center m-1 "
      />
      <View className=" w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6">
        <Text className="text-lg font-medium text-gray"></Text>
      </View>

      <View className="  w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6">
        <Text
          numberOfLines={1}
          className=" text-gray text-base text-center font-semibold"
          adjustsFontSizeToFit
        >
          Price
        </Text>
      </View>
      <View className=" w-1/12 sm:w-1/12 md:w-1/6 lg:w-1/6">
        <Text
          numberOfLines={1}
          className=" text-gray text-base text-center  font-semibold"
          adjustsFontSizeToFit
        >
          Qty
        </Text>
      </View>
      <View className=" w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 mr-3">
        <Text
          numberOfLines={1}
          className=" text-gray  text-base text-center font-semibold"
          adjustsFontSizeToFit
        >
          Subtotal
        </Text>
      </View>
    </View>
  );
}
