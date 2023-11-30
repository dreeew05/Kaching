import { View, Text } from 'react-native';

// INTERFACE
import { CartItemProps } from './__utils__/interfaces/CartItemProps';

export default function CartItemCard(item: CartItemProps) {
  const subTotalPrice = item.price * item.quantity;

  return (
    <View className="marker:flex-1 self-stretch bg-slate-100 dark:bg-black">
      <View className=" mr-5 ml-5">
        <View className="flex-row py-5 px-5">
          <View>
            <Text className="text-lg font-semibold self-left text-green">{item.name}</Text>
            <Text className="">${item.price}</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row justify-end">
              <View className="flex-row ">
                <Text className="p-2 text-lg mr-2 text-right">{item.quantity}</Text>
                <View className="self-center w-20">
                  <Text className="text-right">${subTotalPrice}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
