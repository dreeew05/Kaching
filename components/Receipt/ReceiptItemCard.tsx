import { View, Text } from 'react-native';

// INTERFACE
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';

export default function CartItemCard(item: CartItemProps) {

  const subTotalPrice = item.price * item.quantity;

  return (
    
    <View className="flex-1 self-stretch">
      <View className="self-center">
        <View className="flex-row space-x-2">
          {/* Container for Quantity */}
          <View className="flex items-center w-10 ">
            <Text
              className="py-2 text-lg text-right text-gray font-medium">{item.quantity}
            </Text>
          </View>
          
          {/* Container for Name */}
          <View className="flex items-center w-36">
            <Text
              className="py-2 text-lg text-right text-gray font-medium"
              numberOfLines={1} // limit the number of lines to 1
              ellipsizeMode="tail" // add ellipsis at the end of the truncated text
              >{item.name}</Text>
          </View>
          
          {/* Container for Price */}
          <View className="flex items-center w-16 ">
            <Text className="py-2 text-lg text-right text-gray font-medium ">{item.price}</Text>
          </View>
          
          {/* Container for Subtotal */}
          <View className="flex items-center w-160">
            <Text className="py-2 text-lg text-right text-gray font-medium">{subTotalPrice}</Text>
          </View>
        </View>
      </View>
    </View>

  );
}
