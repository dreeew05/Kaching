import { Text, View } from 'react-native';

// COMPONENTS
import OrderSummaryGenerator from '../../components/OrderSummary/OrderSummaryGenerator';
import { Provider, useSelector } from 'react-redux';
import { Store } from '../../redux/Store'; 
import OrderSummaryTable from '../../components/OrderSummary/OrderSummaryTable';
import Total from '../../components/Common/Total';
import RainbowBackground from '../../components/Rainbow';

export default function TabOneScreen() {

    return (
        <RainbowBackground>
            <Provider store={Store}>
                <View className="flex-1 self-stretch pt-16">
                    <Text className="text-4xl ml-5 text-white" style={{fontFamily: 'Poppins-Medium'}}>
                    Order Summary
                    </Text>

                    <OrderSummaryTable/>
                    
                    <OrderSummaryGenerator/>

                    <Total page='summary' />
                </View>
            </Provider>
        </RainbowBackground>
    );
}


