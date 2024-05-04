import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../../redux/CartRedux/CartSelectors';
import CustomPressable from './CustomPressable';

interface TotalProps {
  page: string;
}

export default function Total({ page }: TotalProps) {
  const router = useRouter();

  const cartState = useSelector(selectCartTotalPrice);

  const viewOrderSummary = () => {
    router.push('/(tabs)/orderSummary');
  };

  const viewPayment = () => {
    router.push('/(tabs)/paymentWrapper');
  };

  const isCheckoutDisabled = cartState === 0;

  return (
    <View className="bg-white">
      <View
        className="flex-row justify-between px-5 pt-3 border-spacing-3  border-4 border-white
          border-t-neutral-300"
      >
        <Text
          className="text-xl text-zinc-500"
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          Total price:
        </Text>
        <Text
          className="text-3xl text-zinc-500 "
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          ₱{cartState.toFixed(2)}
        </Text>
      </View>

      {/* BUTTON */}
      <View className="py-5">
        {page === 'cart' && (
          <CustomPressable
            text="Checkout"
            onPress={viewOrderSummary}
            disabled={isCheckoutDisabled}
          />
        )}
        {page === 'summary' && (
          <CustomPressable
            text="Proceed to Payment"
            onPress={viewPayment}
          />
        )}
      </View>
    </View>
  );
}
