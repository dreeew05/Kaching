import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../../redux/CartRedux/CartSelectors';
import { View, Text } from 'react-native';
import CustomPressable from '../CustomPressable';

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
    router.push('/(tabs)/PaymentProvider');
  };

  const isCheckoutDisabled = cartState === 0;

  return (
    <View>
      <View
        className="flex-row justify-between 
                p-4 border-spacing-3 border-2 border-white
                border-t-neutral-300"
      >
        <Text className="text-xl text-zinc-500" style={{ fontFamily: 'Poppins-Regular' }}>
          Total price:
        </Text>
        <Text className="text-3xl text-zinc-500" style={{ fontFamily: 'Poppins-Regular' }}>
          ${cartState}
        </Text>
      </View>

      {/* BUTTON */}
      <View>
        {page === 'cart' && (
          <CustomPressable
            text="Checkout"
            onPress={viewOrderSummary}
            disabled={isCheckoutDisabled}
          />
        )}
        {page === 'summary' && 
          <CustomPressable text="Proceed to Payment" 
            onPress={viewPayment} 
          />
        }
      </View>
    </View>
  );
}
