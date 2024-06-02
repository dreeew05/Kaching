import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import PreviousDatesScrollView from '../../components/Report/PreviousDatesGenerator';
import { Ionicons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [datePicked, setDatePicked] = useState(false);
  const [eodDates, setEodDates] = useState<[string, Date][]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchEodDates();
  }, []);

  const fetchEodDates = () => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT start, COUNT(*) as count FROM eods GROUP BY DATE(start)`,
        [],
        (_, { rows }) => {
          const dates: [string, Date][] = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const date = new Date(row.start);
            const formattedDate = `${date.toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}${row.count > 1 ? ` (${row.count})` : ''}`;
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
