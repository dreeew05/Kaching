//create flatlist from previous dates, starting from the most recent
import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Text, View } from './Themed';


interface PreviousDatesScrollViewProps {
  numDates: number;
}

const PreviousDatesScrollView: React.FC<PreviousDatesScrollViewProps> = ({ numDates }) => {
  // Function to generate an array of previous dates
  const generatePreviousDates = (numDays: number): string[] => {
    const dates: string[] = [];
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
  
        dates.push(formattedDate);
      }
      
    return dates;
  };

  // Generate an array of previous dates based on the provided prop
  const previousDates: string[] = generatePreviousDates(numDates);

  return (
    <ScrollView className='flex-1 w-full'>
        <View className='px-6 py-4 items-center'>
            {previousDates.map((date, index) => (
                <Pressable 
                    //onPress={() => console.log('Be dynamic here')}
                    className='p-4 w-full my-3 rounded-xl border-2 border-gray'
                    key={index}>
                    <Text 
                        className='text-base text-green font-bold mx-2'>
                        {date}
                    </Text>
                </Pressable>
                ))}
        </View>
    </ScrollView>
  );
};

export default PreviousDatesScrollView;