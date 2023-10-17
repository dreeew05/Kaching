import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View, Dimensions } from 'react-native';


// TEST DATA
import testCartData from '../../utils/testCartData';

export default function TabOneScreen() {
  
    const showAlert = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };

      // GO TO MODIFY CATEGORIES PAGE
    const router = useRouter();
    const viewOrderSummary = () => {
        router.push('/(tabs)/orderSummary');
    }
      
    return (
        <View className="flex-1 self-stretch bg-white dark:bg-black">
            <Text className="text-5xl ml-2 font-semibold text-green">Cart</Text>
            
            <View>
                <Text className="text-3xl ml-2">Total price:</Text>
                <Text className="text-3xl ml-2">$117</Text>
                <Pressable className="bg-transparent w-1/4 
                border-2 border-green rounded-md py-2 px-4 mt-2 mb-5 ml-2" 
                onPress={showAlert}>
                    <Text className="text-green font-bold inset-0">Checkout</Text>
                </Pressable>
            </View>
            
        </View>
    );
}


