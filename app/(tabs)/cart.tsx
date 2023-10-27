import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View, Dimensions, ScrollView } from 'react-native';
// import { PopUpModal } from '../../components/PopUpModal'

// COMPONENTS
import CartItemList from '../../components/CartItemList';

// TEST DATA
import testData from '../../utils/testCartData';

export default function TabOneScreen() {
  
  const showAlert = () => {
      Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  const router = useRouter();
  const viewOrderSummary = () => {
    router.push('/(tabs)/orderSummary');
  }
      
  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <ScrollView>
        <Text className="text-4xl ml-5 text-green"
          style={{fontFamily: 'Poppins-Bold'}}>
          Cart
        </Text>
              
          {/* Generate Items */}
          <CartItemList
              items={testData}
          />
      </ScrollView>

      <View className='flex-row justify-between p-4 border-spacing-3 border-2 border-white border-t-darkgreen'>
          <Text className="text-2xl">Total price:</Text>
          <Text className="text-2xl">$117</Text>
      </View>
      <Pressable className="bg-transparent w-2/3 self-center bg-green items-center rounded-full py-2 px-4 mb-5 ml-2" 
        onPress={viewOrderSummary}>
        <Text className="text-white text-xl font-bold">Checkout</Text>
      </Pressable>
      
    </View>
  );
}


