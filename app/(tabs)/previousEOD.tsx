import { useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import PreviousDatesScrollView from '../../components/Report/PreviousDatesGenerator';
import { useFocusEffect } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [eodDates, setEodDates] = useState<[string, Date][]>([]);
  const router = useRouter();

  const fetchEodDates = () => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT eod_id, start, end FROM eods WHERE iscurrent = 0 ORDER BY start DESC`,
        [],
        (_, { rows }) => {
          const dateMap = new Map<string, number>();
          const dates: [string, Date][] = [];

          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const date = new Date(row.start);
            const dateKey = date.toISOString().slice(0, 10);

            if (dateMap.has(dateKey)) {
              dateMap.set(dateKey, dateMap.get(dateKey)! + 1);
            } else {
              dateMap.set(dateKey, 1);
            }

            const postfix = dateMap.get(dateKey)! > 1 ? ` (${dateMap.get(dateKey)})` : '';
            const formattedDate = `${date.toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}${postfix}`;

            dates.push([formattedDate, date]);
          }

          setEodDates(dates);
        },
        (_, error) => {
          console.log('Error fetching EOD dates: ', error);
          return true;
        }
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchEodDates();
    }, [])
  );

  const handleDateFromPicker = (dateSelected: Date) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO date_picked (date) VALUES (?)`,
        [dateSelected.toISOString().slice(0, 10)],
        (tx, results) => {
          console.log(dateSelected.toISOString().slice(0, 10));
          console.log(results.rowsAffected);
        }
      );
    });
    goToEOD();
  };

  const goToEOD = () => {
    router.push('/(tabs)/olderEODSbyDate');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full flex-row justify-between px-6">
        <Text className="text-2xl">Recent EOD's</Text>
      </View>
      <PreviousDatesScrollView dates={eodDates} getDate={handleDateFromPicker} />
    </View>
  );
}
