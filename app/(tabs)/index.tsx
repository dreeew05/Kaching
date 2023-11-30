import React from 'react';
import { ScrollView, View } from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import SaleDashboard from '../../components/Home/SaleDashboard';
import CategoryGenerator from '../../components/Home/CategoryGenerator';

export default function HomeScreen() {
  // Hide/Show start day pressable
  const hasStartDayData = true;
  const cashierName = 'Palmsdale Kevin'; // Replace with the actual cashier name

  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <ScrollView>
        <StoreInformationGenerator />

        <DayStarter hasStartDayData={hasStartDayData} cashierName={cashierName} />

        <SaleDashboard />

        <CategoryGenerator />
      </ScrollView>
    </View>
  );
}
