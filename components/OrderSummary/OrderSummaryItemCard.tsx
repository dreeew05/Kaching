import React from 'react';
import { Image, Text, View } from 'react-native';

// INTERFACE
import { OrderSummaryProps } from '../__utils__/interfaces/OrderSummaryProps';

export default function OrderSummaryItemCard(
  item: OrderSummaryProps,
) {
  const subTotalPrice = item.totalPrice * item.quantity;

  return (
    <View className="flex flex-row items-center bg-slate-200 rounded-xl m-3 p-1 justify-between">
      <Image
        source={{ uri: item.image }}
        className="w-12 sm:w-12 md:w-16 lg:w-20 h-12 sm:h-12 md:h-16 lg:h-20 rounded border-4 self-center m-1"
      />

      <View className="w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6">
        <Text
          className="text-base font-medium text-gray"
          numberOfLines={1} // limit the number of lines to 1
          ellipsizeMode="tail" // add ellipsis at the end of the truncated text
        >
          {item.name}
        </Text>
      </View>

      <View className="w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 ">
        <Text
          adjustsFontSizeToFit
          className="text-base text-gray text-center"
          numberOfLines={1} // limit the number of lines to 1
          ellipsizeMode="tail" // add ellipsis at the end of the truncated text
        >
          ₱{item.totalPrice.toFixed(2)}
        </Text>
      </View>

      <View className="w-1/12 sm:w-1/12 md:w-1/6 lg:w-1/6">
        <Text
          adjustsFontSizeToFit
          className="text-base text-gray text-center"
        >
          {item.quantity}
        </Text>
      </View>

      <View className="w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 mr-3">
        <Text
          adjustsFontSizeToFit
          className="text-base font-medium text-gray text-center"
          numberOfLines={1} // limit the number of lines to 1
          ellipsizeMode="tail" // add ellipsis at the end of the truncated text
        >
          ₱{subTotalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
