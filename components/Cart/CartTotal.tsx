import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function CartTotal() {

    const router = useRouter();

    const viewOrderSummary = () => {
        router.push('/(tabs)/orderSummary')
    }

    return(
        <View>
            <View className='flex-row justify-between p-4 border-spacing-3
                border-2 border-white border-t-darkgreen'
            >
                <Text className="text-2xl">Total price:</Text>
                <Text className="text-2xl">$117</Text>
            </View>
            
            <Pressable className="bg-transparent w-2/3 self-center bg-green
                items-center rounded-full py-2 px-4 mb-5 ml-2" 
                onPress={viewOrderSummary}
            >
                <Text className="text-white text-xl font-bold">
                    Checkout
                </Text>
            </Pressable>
        </View>
    )
}