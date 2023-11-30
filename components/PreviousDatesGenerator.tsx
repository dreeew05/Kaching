//create flatlist from previous dates, starting from the most recent
import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Text, View } from './Themed';

interface PreviousDatesScrollViewProps {
  numDates: number;
  getDate: (date: Date) => void;
}

const PreviousDatesScrollView: React.FC<PreviousDatesScrollViewProps> = ({ numDates, getDate }) => {
  // Function to generate an array of previous dates
  const generatePreviousDates = (numDays: number): [string, Date][] => {
    const dates: [string, Date][] = [];
    const today = new Date();

    for (let i = 1; i < numDays; i++) {
      const previousDate = new Date(today);
      previousDate.setDate(today.getDate() - i);

      // Format the date to Month Day, Year
      const formattedDate = previousDate.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      dates.push([formattedDate, previousDate]);
    }

    return dates;
  };

  // Generate an array of previous dates based on the provided prop
  const previousDates: [string, Date][] = generatePreviousDates(numDates);

  const sendDataToParent = (date: Date) => {
    // Function to send data to the parent
    getDate(date);
  };

  return (
    <ScrollView className="flex-1 w-full">
      <View className="px-6 py-4 items-center">
        {previousDates.map((date, index) => (
          <Pressable
            onPress={() => sendDataToParent(date[1])}
            className="p-4 w-full my-3 rounded-xl border-2 border-gray"
            key={index}
          >
            <Text className="text-base text-green font-bold mx-2">{date[0]}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default PreviousDatesScrollView;
