import { Text, View } from '../../components/Themed';
import PreviousDatesScrollView from '../../components/PreviousDatesGenerator';
import { Ionicons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <View className='w-full flex-row justify-between px-6'>
        <Text className='text-2xl'>
          Recent EOD's
        </Text>
        <Ionicons name="calendar-sharp" size={30} color="#FFAD42" />
      </View>
        <PreviousDatesScrollView numDates={30} />
    </View>
  );
}
;
