import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

// COMPONENTS
import { Provider } from 'react-redux';
import Total from '../../components/Common/Total';
import OrderSummaryGenerator from '../../components/OrderSummary/OrderSummaryGenerator';
import OrderSummaryTable from '../../components/OrderSummary/OrderSummaryTable';
import { Store } from '../../redux/Store';

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white">
        <Text
          className="text-4xl ml-5 text-green pt-5"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          Order Summary
        </Text>

        <OrderSummaryTable />

        <OrderSummaryGenerator />

        <Total page="summary" />
      </View>
    </Provider>
  );
}
