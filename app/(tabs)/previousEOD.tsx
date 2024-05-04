import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import CalendarPicker from '../../components/Report/CalendarPicker';
import PreviousDatesScrollView from '../../components/Report/PreviousDatesGenerator';
import { Text, View } from '../../components/Themed';

import { Ionicons } from '@expo/vector-icons';

// TEST DATA

export default function TabTwoScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [datePicked, setDatePicked] = useState(false);

  let callEOD: boolean = false;
  let date = new Date();

  const handleDateFromPicker = (dateSelected: Date) => {
    date = dateSelected;
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO date_picked (date) VALUES (?)`,
        [date.toISOString().slice(0, 10)],
        (tx, results) => {},
      );
    });
    goToEOD();
  };

  const router = useRouter();
  const goToEOD = () => {
    router.push('/(tabs)/olderEODSbyDate');
  };

  return (
    <>
      {showCalendar ? (
        <View className="flex-1">
          <View className="flex items-end pr-4">
            <Pressable onPress={() => setShowCalendar(false)}>
              <Ionicons name="ios-close" size={30} color="black" />
            </Pressable>
          </View>
          <View className="flex items-center py-6">
            <Text className="text-2xl font-bold pb-6 text-green">
              Choose a date
            </Text>
            <CalendarPicker onDateFromPicker={handleDateFromPicker} />
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center bg-white">
          <View className="w-full flex-row justify-between px-6 bg-white py-4">
            <Text className="text-2xl text-green ">Recent EOD's</Text>
            <Pressable onPress={() => setShowCalendar(true)}>
              <Ionicons
                name="calendar-sharp"
                m
                size={30}
                color="#FFAD42"
              />
            </Pressable>
          </View>
          <PreviousDatesScrollView
            numDates={31}
            getDate={handleDateFromPicker}
          />
        </View>
      )}
    </>
  );
}
