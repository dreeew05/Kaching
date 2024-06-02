//create flatlist from previous dates, starting from the most recent
import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Text, View } from '../Themed';
import { Link } from 'expo-router';

interface PreviousDatesScrollViewProps {
  dates: { date: string; eodId: number }[];
  onSelectDate: (date: string, eodId: number) => void;
}

const PreviousDatesScrollView: React.FC<PreviousDatesScrollViewProps> = ({ dates, onSelectDate}) => {
  const handleDatePress = (date: string, eodId: number) => {
    onSelectDate(date, eodId);
  };

  return (
    <ScrollView className="flex-1 w-full bg-white">
      <View className="px-6 py-4 items-center bg-white">
        {dates.map(({ date, eodId }, index) => (
          console.log("date:" + date, "eodId: " + eodId),
          <Link
            key={index}
            href={{
              pathname: '/(tabs)/olderEODSbyDate',
              // /* 1. Navigate to the details route with query params */
              params: {
                eodId: eodId,
                date: date,
              },
            }}
            className="p-4 w-full my-3 rounded-xl border-2 border-gray"
            asChild
          >
            <Pressable
              onPress={() => handleDatePress(date, eodId)}
              accessibilityRole="button"
              className="p-4 w-full my-3 rounded-xl border-2 border-gray"
              key={index}
            >
              <Text className="text-base text-green font-bold mx-2">
                {date}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default PreviousDatesScrollView;