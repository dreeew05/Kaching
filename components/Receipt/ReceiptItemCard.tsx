import { Text, View } from 'react-native';

// INTERFACE
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';

export default function CartItemCard(item: CartItemProps) {
  const subTotalPrice = item.price * item.quantity;

  return (
    <View className="flex-1 flex-row items-center justify-between w-12/12 self-center">
      <View className="self-center flex-1 flex ">
        <View className="flex-row space-x-2 ">
          {/* Container for Quantity */}
          <View className="flex-1 w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 ">
            <Text className="py-2 text-center text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray font-medium">
              {item.quantity}
            </Text>
          </View>

          {/* Container for Name */}
          <View className="flex-1 w-2/6 sm:w-2/6 md:w-2/6 lg:w-2/6 ">
            <Text
              className="py-2 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center  text-gray font-medium overflow-hidden"
              numberOfLines={1} // limit the number of lines to 1
            >
              {item.name}
            </Text>
          </View>

          {/* Container for Price */}
          <View className="flex-1  w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6 ">
            <Text className="py-2 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center text-gray font-medium ">
              ₱{item.price}
            </Text>
          </View>

          {/* Container for Subtotal */}
          <View className="flex-1  w-2/6 sm:w-1/6 md:w-2/6 lg:w-2/6">
            <Text
              numberOfLines={1}
              className="py-2 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-center text-gray font-medium"
            >
              ₱{subTotalPrice}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
