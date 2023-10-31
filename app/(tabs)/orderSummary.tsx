import { useRouter } from 'expo-router';
import { Pressable, Text, View, Dimensions } from 'react-native';

// COMPONENTS
import OrderSummaryGenerator from '../../components/OrderSummary/OrderSummaryGenerator';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';

export default function TabOneScreen() {
    
    const router = useRouter();

    const viewCart = () => {
        router.push('/(tabs)/cart');
    }
    const viewPayment = () => {
        router.push('/(tabs)/payment');
    } 

    
    return (
        <Provider store={Store}>
            <View className="flex-1 self-stretch bg-white dark:bg-black">
                <Pressable className="bg-transparent w-1/4" onPress={viewCart}> 
                    <Text className="text-green font-bold inset-0">Back</Text>
                </Pressable>
                <Text className="text-5xl ml-2 font-semibold text-green">Order Summary</Text>
                
                <OrderSummaryGenerator/>

                <View className='flex-row justify-between p-4 border-spacing-3 border border-white border-t-gray'>
                    <Text className="text-2xl ml-2">Total price:</Text>
                    <Text className="text-2xl ml-2">$117</Text>
                </View>
                <Pressable className="bg-transparent w-2/3 self-center bg-green items-center rounded-full py-2 px-4 mb-5 ml-2" 
                    onPress={viewPayment}>
                    <Text className="text-white text-xl font-bold">Proceed to Payment</Text>
                </Pressable>
            </View>
        </Provider>
    );
}


