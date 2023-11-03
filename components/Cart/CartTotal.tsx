import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../redux/CartSelectors";
import CustomPressable from "../CustomPressable";

export default function CartTotal() {
  const router = useRouter();
  const cartState = useSelector(selectCartTotalPrice);

  const viewOrderSummary = () => {
    router.push('/(tabs)/orderSummary');
  };

  // Disable checkout button if cart is empty
  const isCheckoutDisabled = cartState === 0;

  return (
    <View>
      <View className='flex-row justify-between 
        p-4 border-spacing-3 border-2 border-white
        border-t-neutral-300'
      >
        <Text className="text-xl text-gray" 
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          Total price:
        </Text>
        <Text className="text-3xl" 
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          ${cartState}
        </Text>
      </View>
      <CustomPressable text="Checkout" 
        onPress={viewOrderSummary} 
        disabled={isCheckoutDisabled} 
      />
    </View>
  );
}
