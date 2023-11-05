// startDayInput.tsx
import React, { useState } from 'react';
import { Alert, View, Text } from 'react-native';
import StartDayInput from '../../components/StartDay';

// Define an interface for the start day data
interface StartDayData {
  cashierName: string;
  contactNumber: string;
  pettyCashAmount: number | undefined;
}

export default function ParentComponent() {
  const [startDayData, setStartDayData] = useState<StartDayData | null>(null);

  const handleStartDay = (startDayData: StartDayData) => {
    setStartDayData(startDayData);
    Alert.alert('Show Alert Action', 'This is a dummy action.');
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
