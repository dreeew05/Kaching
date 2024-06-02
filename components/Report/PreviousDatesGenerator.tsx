//create flatlist from previous dates, starting from the most recent
import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Text, View } from '../Themed';

interface PreviousDatesScrollViewProps {
  dates: [string, Date][];
  getDate: (date: Date) => void;
}

const PreviousDatesScrollView: React.FC<PreviousDatesScrollViewProps> = ({ dates, getDate }) => {
  const sendDataToParent = (date: Date) => {
    // Function to send data to the parent
    getDate(date);
  };

  return (
    <ScrollView className="flex-1 w-full bg-white">
      <View className="px-6 py-4 items-center bg-white">
        {dates.map((date, index) => (
          <Pressable
            onPress={() => sendDataToParent(date[1])}
            className="p-4 w-full my-3 rounded-xl border-2 border-gray"
            key={index}
          >
            <Text className="text-base text-green font-bold mx-2">
              {date[0]}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default PreviousDatesScrollView;
