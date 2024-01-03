import React from 'react';
import { ScrollView, View } from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import SaleDashboard from '../../components/Home/SaleDashboard';
import CategoryGenerator from '../../components/Home/CategoryGenerator';
import { initializeDatabase } from '../../components/DatabaseUtils/InitializeDatabase';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';

export default function HomeScreen() {
  // Hide/Show start day pressable
  const hasStartDayData = true;
  const cashierName = 'Palmsdale Kevin'; // Replace with the actual cashier name

  // Initialize database
  initializeDatabase();

  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <ScrollView>
          <StoreInformationGenerator />

          <DayStarter hasStartDayData={hasStartDayData} 
            cashierName={cashierName} />

          <SaleDashboard />

          <CategoryGenerator />
        </ScrollView>
      </View>
    </Provider>
  );
}
