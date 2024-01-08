import { View, Text } from 'react-native';

// INTERFACE
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';

export default function CartItemCard(item: CartItemProps) {

  const subTotalPrice = item.price * item.quantity;

  return (
    
    <View className="flex-1 self-stretch">
      <View className="flex-row self-center">
        <View className="flex-row justify-end space-x-6">
          {/* Container for Quantity */}
          <View className="flex items-center w-14 overflow-hidden">
            <Text className="py-2 text-lg text-right text-gray font-medium">{item.quantity}</Text>
          </View>
          
          {/* Container for Name */}
          <View className="flex items-center w-20 overflow-hidden">
            <Text className="py-2 text-lg text-right text-gray font-medium">{item.name}</Text>
          </View>
          
          {/* Container for Price */}
          <View className="flex items-center w-14 overflow-hidden">
            <Text className="py-2 text-lg text-right text-gray font-medium ">{item.price}</Text>
          </View>
          
          {/* Container for Subtotal */}
          <View className="flex items-center w-14 overflow-hidden">
            <Text className="py-2 text-lg text-right text-gray font-medium">{subTotalPrice}</Text>
          </View>
        </View>
      </View>
    </View>

  );
}
