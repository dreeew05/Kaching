import { ScrollView, View } from 'react-native';
import { Provider } from 'react-redux';
import CategoryGenerator from '../../components/Home/CategoryGenerator';
import DayStarter from '../../components/Home/DayStarter';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import { Store } from '../../redux/Store';
import { getStartDayStatus } from '../../components/DatabaseUtils/FetchInstructions/GetStartDayStatus';
import DayStarterCheck from '../../components/Home/DayStarterCheck';

export default function HomeScreen() {
  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white">
        <ScrollView>
          <View className="h-3 bg-green"></View>
          <StoreInformationGenerator />

          <DayStarterCheck />
          <CategoryGenerator />
        </ScrollView>
      </View>
    </Provider>
  );
}
