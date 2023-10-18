import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View, Dimensions } from 'react-native';

// COMPONENTS
import OrderSummaryItemList from '../../components/OrderSummaryItemList';

// TEST DATA
import testData from '../../utils/testCartData';

export default function TabOneScreen() {
  
    const showAlert = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };

    const router = useRouter();

    const viewCart = () => {
        router.push('/(tabs)/cart');
    }
      
    return (
        <View className="flex-1 self-stretch bg-white dark:bg-black">
            <Pressable className="bg-transparent w-1/4" onPress={viewCart}> 
                <Text className="text-green font-bold inset-0">Back</Text>
            </Pressable>
            <Text className="text-5xl ml-2 font-semibold text-green">Order Summary</Text>
            
            {/* Generate Items */}
            <OrderSummaryItemList
                items={testData}
            />

            <View className='flex-row justify-between p-4 border-spacing-3 border border-white border-t-gray'>
                <Text className="text-2xl ml-2">Total price:</Text>
                <Text className="text-2xl ml-2">$117</Text>
            </View>
            <Pressable className="bg-transparent w-2/3 self-center bg-green items-center rounded-full py-2 px-4 mb-5 ml-2" 
                onPress={showAlert}>
                <Text className="text-white text-xl font-bold">Proceed to Payment</Text>
            </Pressable>
        </View>
    );
}


