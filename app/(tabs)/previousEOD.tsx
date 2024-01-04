import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import PreviousDatesScrollView from '../../components/PreviousDatesGenerator';
import CalendarPicker from '../../components/CalendarPicker';
import { Ionicons } from '@expo/vector-icons';


// TEST DATA
const table1 = 
  {
    header : ['Appetizer'],
    tableData : [['Mozarella Sticks', 'x25', 'P565.50'],
                ['Bruschetta', 'x15', 'P25,000.00'],
                ['Deviled Eggs', 'x100', 'P100.00']]
  }

export default function TabTwoScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  let callEOD: boolean = false;
  let date = new Date();

  const handleDateFromPicker = (dateSelected: Date) => {
    date = dateSelected;
    callEOD = true;
    console.log(date);

  };

  return (
    <>
      {
        showCalendar ? 
        (  
        <View className='flex-1'> 
        <View className='flex items-end pr-4'>
          <Pressable
            onPress={() => setShowCalendar(false)}>
            <Ionicons name="ios-close" size={30} color="black" />
          </Pressable>
        </View>
        <View className='flex items-center py-6'>
          <Text className='text-2xl font-bold pb-6 text-green'>
            Choose a date
          </Text>
          <CalendarPicker onDateFromPicker={handleDateFromPicker}/>
        </View>
        </View>
        ) 
          : 
        (
        <View className='flex-1 items-center justify-center'>
          <View className='w-full flex-row justify-between px-6'>
            <Text className='text-2xl'>
              Recent EOD's
            </Text>
            <Pressable
              onPress={() => setShowCalendar(true)}>
              <Ionicons name="calendar-sharp" size={30} color="#FFAD42" />
            </Pressable>
            </View>
          <PreviousDatesScrollView numDates={31} getDate={handleDateFromPicker} />
        </View>
        )
      }
    </>
  );
}
;
