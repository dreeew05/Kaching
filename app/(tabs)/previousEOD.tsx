import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import PreviousDatesScrollView from '../../components/Report/PreviousDatesGenerator';
import CalendarPicker from '../../components/Report/CalendarPicker';
import currentEOD from './olderEODSbyDate';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

// TEST DATA

export default function TabTwoScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [datePicked, setDatePicked] = useState(false);

  let callEOD: boolean = false;
  let date = new Date();

  const handleDateFromPicker = (dateSelected: Date) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO date_picked (date) VALUES (?)`,
        [dateSelected.toISOString().slice(0, 10)],
        (tx, results) => {
          console.log(dateSelected.toISOString().slice(0, 10));
          console.log(results.rowsAffected);
        },
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
      <View className="flex-1 items-center justify-center">
        <View className="w-full flex-row justify-between px-6">
          <Text className="text-2xl">Recent EOD's</Text>
        </View>
        <PreviousDatesScrollView
          numDates={31}
          getDate={handleDateFromPicker}
        />
      </View>
    </>
  );
}
