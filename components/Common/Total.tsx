import { useRouter } from "expo-router"
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../redux/CartSelectors";
import { View, Text } from "react-native";
import CustomPressable from "../CustomPressable";

interface TotalProps {
    page : string
}

export default function Total({ page } : TotalProps) {

    const router = useRouter();

    const cartState = useSelector(selectCartTotalPrice);

    const totalPrice = page === 'summary' 
        ? cartState + (cartState * 0.25)
        : cartState

    const viewOrderSummary = () => {
        router.push('/(tabs)/orderSummary')
    }

    const viewPayment = () => {
        router.push('/(tabs)/payment')
    }

    const isCheckoutDisabled = cartState === 0;

    return (

        <View>

            <View className='flex-row justify-between 
                p-4 border-spacing-3 ' 
            >
                <Text className="text-2xl text-white bold" 
                    style={{ fontFamily: 'Poppins-Regular' }}
                >
                    Total price:
                </Text>
                <Text className="text-3xl text-white" 
                    style={{ fontFamily: 'Poppins-Regular' }}
                >
                    ${totalPrice}
                </Text>
            </View>

            {/* BUTTON */}
            <View >
                {
                    page === 'cart' && (
                        <CustomPressable
                            text="Checkout"
                            onPress={viewOrderSummary}
                            disabled={isCheckoutDisabled}
                        />
                    )
                }
                {
                    page === 'summary' && (
                        <CustomPressable
                            text="Proceed to Payment"
                            onPress={viewPayment}
                        />
                    )
                }
            </View>

        </View>
    );

}