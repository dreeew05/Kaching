import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import PreviousDatesScrollView from '../../components/Report/PreviousDatesGenerator';

interface EodDate {
  date: string;
  eodId: number;
}

const TabTwoScreen: React.FC = () => {
  const [eodDates, setEodDates] = useState<[string, number][]>([]);
  const [selectedEodId, setSelectedEodId] = useState<number | null>(
    null,
  );

  const fetchEodDates = () => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT eod_id, start, end 
        FROM eods 
        WHERE iscurrent = 0 
        ORDER BY start DESC`,
        [],
        (_, { rows }) => {
          const dateMap = new Map<string, number>();
          const dates: [string, number][] = [];

          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const date = new Date(row.start);
            const dateKey = date.toISOString().slice(0, 10);

            if (dateMap.has(dateKey)) {
              dateMap.set(dateKey, dateMap.get(dateKey)! + 1);
            } else {
              dateMap.set(dateKey, 1);
            }

            const postfix =
              dateMap.get(dateKey)! > 1
                ? ` (${dateMap.get(dateKey)})`
                : '';
            const formattedDate = `${date.toLocaleDateString(
              undefined,
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              },
            )}${postfix}`;

            dates.push([formattedDate, row.eod_id]);
          }

          setEodDates(dates);
        },
        // (_, error) => {
        //   console.log('Error fetching EOD dates: ', error);
        // }
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchEodDates();
    }, []),
  );

  useEffect(() => {
    fetchEodDates();
  }, []);

  const handleDateSelection = (date: string, eodId: number) => {
    setSelectedEodId(eodId);
    // Fetch EOD report based on selected EOD ID
    // Example: fetchEodReport(eodId);
  };

  return (
    <View className="flex-1 items-center justify-center pt-5 bg-white">
      <View className="w-full py-2">
        <Text className="text-2xl text-green self-center items-center font-semibold text-center">
          Recent EOD's
        </Text>
      </View>
      <PreviousDatesScrollView
        dates={eodDates.map(([date, eodId]) => ({ date, eodId }))}
        onSelectDate={handleDateSelection}
      />
    </View>
  );
};

export default TabTwoScreen;
