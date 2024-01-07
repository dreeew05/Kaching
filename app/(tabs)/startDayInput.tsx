// startDayInput.tsx
import React, { useState } from 'react';
import { Alert, View, Text } from 'react-native';
import StartDayInput from '../../components/StartDay';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useRouter } from 'expo-router';

// Define an interface for the start day data
interface StartDayData {
  cashierName: string;
  contactNumber: string;
  pettyCashAmount: number | undefined;
}

export default function ParentComponent() {
  const [startDayData, setStartDayData] = useState<StartDayData | null>(null);

  const handleStartDay = (startDayData: StartDayData) => {
    // Save the start day data to the database
    setStartDayData(startDayData);
    const db = getDatabase();

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO eods (cashiername, contactnum, pettycash) VALUES (?, ?, ?)',
        [ startDayData.cashierName, 
          startDayData.contactNumber, 
          startDayData.pettyCashAmount
        ],
        (txObj, resultSet) => {
          console.log('Start day data inserted.');
          console.log(resultSet);
        },
        (txObj, error) => {
          console.log('Error inserting start day data.');
          console.log(error);
        }
      );
    });

    // go back to home screen
    goBack();
  };

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      {startDayData ? (
        // Render content based on having startDayData
        <View>
          <Text>Data from Start Day:</Text>
          <Text>Cashier's Name: {startDayData.cashierName}</Text>
          <Text>Contact Number: {startDayData.contactNumber}</Text>
          <Text>Petty Cash Amount: {startDayData.pettyCashAmount}</Text>
        </View>
      ) : (
        // Render StartDayInput when startDayData is not available
        <StartDayInput onStartDay={handleStartDay} />
      )}
    </View>
  );
}
