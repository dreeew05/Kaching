import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

// COMPONENTS
import OrderSummaryGenerator from '../../components/OrderSummary/OrderSummaryGenerator';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import CustomPressable from '../../components/CustomPressable';
import OrderSummaryTable from '../../components/OrderSummary/OrderSummaryTable';

export default function TabOneScreen() {
    
    const router = useRouter();

    // const viewCart = () => {
    //     router.push('/(tabs)/cart');
    // }

    
    const viewPayment = () => {
        router.push('/(tabs)/payment');
    } 

    return (
        <Provider store={Store}>
            <View className="flex-1 self-stretch bg-white dark:bg-black">
                <Text className="text-4xl ml-5 text-green" style={{fontFamily: 'Poppins-Medium'}}>
                Order Summary
                </Text>

                <OrderSummaryTable/>
                
                <OrderSummaryGenerator/>

                <View className='flex-row justify-between p-4 border-spacing-3 border-2
                border-white border-t-neutral-300'>
                    <Text className="text-xl text-gray" 
                    style={{fontFamily: 'Poppins-Regular'}}>Total price:</Text>
                    <Text className="text-3xl"
                    style={{ fontFamily: 'Poppins-Regular' }}>$117</Text>
                </View>
                <CustomPressable text="Proceed to Payment" onPress={viewPayment}/>
            </View>
        </Provider>
    );
}


