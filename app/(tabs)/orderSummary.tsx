import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

// COMPONENTS
import OrderSummaryGenerator from '../../components/OrderSummary/OrderSummaryGenerator';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store'; 
import OrderSummaryTable from '../../components/OrderSummary/OrderSummaryTable';
import Total from '../../components/Common/Total';

export default function TabOneScreen() {
    
    const router = useRouter();

    return (
        <Provider store={Store}>
            <View className="flex-1 self-stretch bg-white dark:bg-black">
                <Text className="text-4xl ml-5 text-green" style={{fontFamily: 'Poppins-Medium'}}>
                Order Summary
                </Text>

                <OrderSummaryTable/>
                
                <OrderSummaryGenerator/>

                <Total page='summary' />
            </View>
        </Provider>
    );
}


