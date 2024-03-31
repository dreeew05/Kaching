import { ScrollView, View } from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import CategoryGenerator from '../../components/Home/CategoryGenerator';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';

export default function HomeScreen() {
  // Hide/Show start day pressable
  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <ScrollView>
          <StoreInformationGenerator />
          <DayStarter />
          <CategoryGenerator />
        </ScrollView>
      </View>
    </Provider>
  );
}
